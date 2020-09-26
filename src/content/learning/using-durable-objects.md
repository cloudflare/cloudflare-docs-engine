---
order: 8
---

# Using Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through two features: global uniqueness and a transactional storage API.

* Global Uniqueness guarantees that there will be a single Durable Object with a given id running at once, across the whole world.  Requests for a Durable Object id are routed by the Workers runtime to the Cloudflare point-of-presence that owns the Durable Object.

* The transactional storage API provides strongly-consistent, key-value storage to the Durable Object.  Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may be processed out-of-order from how they arrived at the Object.

For a high-level introduction to Durable Objects, [see the announcement blog post](https://blog.cloudflare.com/introducing-workers-durable-objects).

<Aside type="warning" header="Beta">

Durable Objects are currently in closed beta. If you are interested in using them, [request a beta invite](http://www.cloudflare.com/cloudflare-workers-durable-objects-beta).

</Aside>

## Using Durable Objects

Durable Objects are named instances of a class you define.  Just like a class in object-oriented programming, the class defines the methods and data a Durable Object can access.

Today, Wrangler does not support managing Durable Objects.  There are five steps to creating a Durable Object:

* __Writing the class__ that defines a Durable Object.
* 
* __Binding that class__ into a Worker.
* __Instantiating a Durable Object__ from within a running Worker.
* __Communicating with a Durable Object__ from a running Worker via the Fetch API.

## Writing a class that defines a Durable Object

To define a Durable Object, developers export an ordinary Javascript class.  Other languages will need a shim that translates their class definition to a Javascript class.

The first parameter passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage. The second parameter contains any bindings you have associated with the Worker when you uploaded it.

```js

export class DurableObjectExample {
    constructor(state, environment) {
    }
}

```

Workers communicate with a Durable Object via the fetch API.  Like any other Worker, a Durable Object listens for incoming Fetch events by registering an event handler. The only difference is that for Durable Objects the fetch handler is defined as a method on the class.

```js

export class DurableObjectExample {
    constructor(state, environment) {
    }

    async fetch(request) {
        return new Response('Hello World');
    }

}

```

A Worker can pass information to a Durable Object via headers, the HTTP method, the Request body, or the Request URI.

<Aside>

HTTP requests received by a Durable Object do not come directly from the Internet. They come from other Worker code -- possibly other Durable Objects, or just plain Workers. We'll see how to send such a request in a bit. Durable Objects use HTTP for familiarity, but we plan to introduce other protocols in the future.

</Aside>

### Accessing Storage from a Durable Object

Durable Objects gain access to a [persistent storage API](/runtime-apis/durable-objects#transactional-storage-api) via the first parameter passed to the Durable Object constructor.  While access to a Durable Object is single-threaded, it's important to remember that request executions can still interleave with each other when they wait on I/O, such as when waiting on the promises returned by persistent storage methods or `fetch` requests.

```js

export class DurableObjectExample {
    constructor(controller, environment){
        this.controller = controller
    }

    async fetch(request) {
        let ip = request.headers.get('CF-Connecting-IP');
        let data = await request.text();
        let storagePromise = this.controller.storage.set(ip, data);
        await storagePromise;
        return new Response(ip + ' stored ' + data);
    }

}

```

Each individual storage operation behaves like a database transaction. More complex use cases can wrap multiple storage statements in a transaction. For example, this actor sets a key if and only if its current value matches the provided "If-Match" header value:

```js

export class DurableObjectExample {
    constructor(controller, environment){
        this.controller = controller
    }

    async fetch(request) {
        let key = new Url(request.url).host
        let ifMatch = request.headers.get('If-Match');
        let newValue = await request.text();
        let changedValue = false;;
        await this.controller.transaction(async (txn) => {
          let currentValue = await txn.get(key);
          if (currentValue != ifMatch) {
            txn.rollback();
            return;
          }
          changedValue = true;
          await txn.put(key, newValue);
        });
        return new Response(changedValue);
    }

}

```

Transactions operate at a Serializable isolation level.  This means transactions can fail if they conflict with a concurrent transaction being run by the same Durable Object.  

Transactions are transparently and automatically retried once by rerunning the provided function before returning an error.  To avoid transaction conflicts, don't use transactions when you don't need them, don't hold transactions open any longer than necessary, and limit the number of key-value pairs operated on by each transaction.

<Aside>

Since each Durable Object is single-threaded, technically it is not necessary to use transactions to achieve transactional semantics. With careful use of promises, you could serialize operations in your live object so that there's no possibility of concurrent storage operations. We provide the transactional interface as a convenience for those who don't want to do their own synchronization.

</Aside>

## Configuring your class

<Aside type="warning" header="Wrangler support coming soon">

The following describes the raw HTTP API to upload your class definition, define a Durable Object class, and then bind another worker to be able to talk to it. This functionality is not yet available in Wrangler, but will be very soon, at which point these instructions will become much simpler.

</Aside>

Now that we have a class, we need tell Cloudflare that this class is a Durable Object class, so that the runtime can create instances of this class and allow Workers to contact those instances.

Durable Objects are written using a new kind of Workers syntax based on ES Modules. ES Modules differ from regular JavaScript files in that they have imports and exports. As you saw above, we wrote `export class DurableObjectExample` when defining our class. The `export` statement makes the class visible to the system, so that the Workers Runtime can instantiate it directly.

In order to upload Workers written with this new syntax, you must first define a metadata file. Let's call it `durable-object-example.json`:

```js
// durable-object-example.json
{
    "main_module": "durable-object-example.mjs"
}
```

Now we can upload the script that defines the class:

```sh
curl -i -H "Authorization: Bearer ${API_TOKEN}" "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_TAG}/workers/scripts/${SCRIPT_NAME}" -X PUT -F "metadata=@durable-object-example.json;type=application/json" -F "script=@durable-object-example.mjs;type=application/javascript+module"
```

Now that the script containing the class exists on Cloudflare's servers, we can tell Cloudflare that this script contains a Durable Object class. Use the API to define a new Durable Object class:

```sh
curl -i -H "Authorization: Bearer ${API_TOKEN}" "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_TAG}/workers/durable_objects/namespaces" -X POST --data "{\"name\": \"example-class\", \"script\": \"${SCRIPT_NAME}\", \"class\": \"DurableObjectExample\"}"
```

The new class's ID will be returned in the response; save this for use below.

## Binding the class to a calling Worker

In order for Workers to talk to instances of this class, they need an environment binding for it. This works similarly to Workers KV bindings. A Durable Object class binding is a named global variable that appears in your Worker that provides access to instances of your Durable Object.

Here's a basic Worker script that always forwards all requests to the object named "foo". Our binding for our class shows up as a global called `EXAMPLE_CLASS`.

```
// calling-worker.js
addEventListener("fetch", event => {
    return event.respondWith(handle(event.request));
});

async function handle(request) {
    let objectId = EXAMPLE_CLASS.idFromName("foo");
    let object = EXAMPLE_CLASS.get(objectId);
    return object.fetch(request);
}
```

When uploading the worker that needs to call your Durable Object, you will again need to specify metadata, in order to define the binding.

```js
// calling-worker.json
{
  "body_part": "script",
  "bindings": [
    {
      "type": "durable_object_class",
      "name": "EXAMPLE_CLASS",
      "class_id": "$CLASS_ID"
    }
  ]
}
```

Upload your worker like this:

```sh
curl -i -H "Authorization: Bearer ${API_TOKEN}" "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_TAG}/workers/scripts/${CALLING_SCRIPT_NAME}" -X PUT -F "metadata=@calling-worker.json;type=application/json" -F "script=@calling-worker.js;type=application/javascript+module"
```

<Aside>

In this example, we have used the old, non-modules-based syntax when defining our calling worker. In the new modules-based syntax, the binding `EXAMPLE_CLASS` would not show up as a global variable, but would instead be delivered as a property of the environment object passed as the second parameter when an event handler or class constructor is invoked.

Lots has changed under the new modules-based syntax; we will be providing more complete documentation soon.

</Aside>

## Instantiating a Durable Object

When a Worker talks to a Durable Object, it does so through a "stub" object. The class binding's `get()` method returns a stub, and the stub's `fetch()` method sends [Requests](/runtime-apis/request) to the Durable Object instance.

```js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Derive an object ID from the URL path. `EXAMPLE_CLASS.idFromName()`
  // always returns the same ID when given the same string as input (and
  // called on the same class), but never the same ID for two different
  // strings (or for different classes). So, in this case, we are creating
  // a new object for each unique path.
  let id = EXAMPLE_CLASS.idFromName(new URL(request.url).pathname)

  // Construct the stub for the Durable Object. A "stub" is a client object
  // used to send messages to the Durable Object.
  let stub = await EXAMPLE_CLASS.get(id)

  // Forward the request to the Durable Object. Note that `stub.fetch()` has
  // the same signature as the global `fetch()` function, except that the
  // request is always sent to the object, regardless of the request's URL.
  //
  // The first time we send a request to a new object, the object will be
  // created for us. If we don't store durable state in the object, it will
  // automatically be deleted later (and recreated if we request it again).
  // If we do store durable state, then the object becomes permanent.
  let response = await stub.fetch(request);

  // We received an HTTP response back. We could process it in the usual
  // ways, but in this case we will just return it to the client.
  return response;
}

```

Learn more at the [Workers Durable Objects API reference](/runtime-apis/durable-objects).

<Aside header="String-derived IDs vs. system-generated IDs">

In the above example, we used a string-derived object ID. You can also ask the system generate random unique IDs. System-generated unique IDs have better performance characteristics, but require that you store the ID somewhere in order to access the object again later. [See the API reference docs for more information.](/runtime-apis/durable-objects)

</Aside>

## Limitations during the Beta

Durable Objects is currently in early beta, and some planned features have not been enabled yet. Many of these limitations will be fixed before Durable Objects becomes generally available.

### Risk of Data Loss

At this time, we are not ready to guarantee that data won't be lost. We don't expect data loss, but bugs are always possible, and we are still working on automatic backup and recovery.

For now, if you are storing data in Durable Objects that you can't stand to lose, you must arrange to make backups of that data into some other storage system. Do not rely on Durable Objects for storing production data during the beta period. (This is, of course, always best practice anyway, but it is especially important in the beta.)

### Global Uniqueness

Uniqueness is currently enforced upon starting a new event (such as receiving an HTTP request), and upon accessing storage. After an event is received, if the event takes some time to execute and does not ever access its durable storage, then it is possible that the Durable Object instance may no longer be current, and some other instance of the same object ID will have been created elsewhere. If the event accesses storage at this point, it will receive an exception, but if the event completes without ever accessing storage, it may not ever realize that the object was no longer current.

In particular, a Durable Object may be superseded in this way in the event of a network partition or a software update (including either an update of the Durable Object's class code, or of the Workers system itself).

### Creation and Routing

When using string-derived object IDs, the Durable Object is constructed at a Cloudflare point-of-presence chosen based on a hash of the string. The chosen location has no relationship to the location where the object was requested; it could be on the opposite side of the world. In the future, these objects will be constructed nearby the location where they were first requested (although a global lookup will still be needed to verify that the same name hasn't been used on the other side of the world at the same time).

When using system-generated IDs, the Durable Object is placed at a point-of-presence near where the ID was generated. However, not all Cloudflare locations support Durable Objects yet today, so the object may not be located in exactly the same PoP where it was requested.

Currently, Durable Objects do not migrate between locations after initial creation. We are busy working on automatic migration and will be enabling it in the future.

Because of these factors, when using string-derived object IDs, you may find that request latency varies considerably between objects, while system-generated IDs will result in consistently low latency. Once our work is complete, you should be able to expect that variability exists only in initial creation latency for string-derived IDs.

### Cross-object Storage Access

The storage API is scoped to a single Durable Object.  It is not currently possible to access data stored in a Durable Object from a different Durable Object or external API. There is no support for listing objects or bulk imports or exports.

### Performance

While Durable Objects already perform well for many kinds of tasks, we have lots of performance tuning to do. Expect performance (latency, throughput, overhead, etc.) to improve over the beta period -- and if you observe a performance problem, please tell us about it!

## Example - Counter

We've included complete example code for both the Worker and the Durable Object for a basic counter below.

```js
// Worker

export default {
    async fetch(request, env) {
        return await handleRequest(request, env)
    }
}

async function handleRequest(request, env) {
    let id = env.Counter.idFromName("A")
    let obj = env.Counter.get(id)
    let resp = await obj.fetch(request.url)
    let count = await resp.text()

    return new Response("Durable Object 'A' count: " + count)
}

// Durable Object

export class Counter {
    constructor(controller, env) {
        this.storage = controller.storage
    }

    async initialize() {
        let stored = await this.storage.get("value");
        this.value = stored || 0;
    }

    // Handle HTTP requests from clients.
    async fetch(request) {
        // Make sure we're fully initialized from storage.
        if (!this.initializePromise) {
            this.initializePromise = this.initialize();
        }
        await this.initializePromise;

        // Apply requested action.
        let url = new URL(request.url);
        switch (url.pathname) {
        case "/increment":
            ++this.value;
            await this.storage.put("value", this.value);
            break;
        case "/decrement":
            --this.value;
            await this.storage.put("value", this.value);
            break;
        case "/":
            // Just serve the current value. No storage calls needed!
            break;
        default:
            return new Response("Not found", {status: 404});
        }

        // Return current value.
        return new Response(this.value);
    }
}
```