---
order: 8
---

# Using Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through two features: global uniqueness and a transactional storage API.

* Global Uniqueness guarantees that there will be a single Durable Object with a given id running at once.  Requests for a Durable Object id are routed by the Workers runtime to the Cloudflare point-of-presence that owns the Durable Object.  

* The transactional storage API provides strongly-consistent, key-value storage to the Durable Object.  Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request threads may be processed out-of-order from how they arrived at the Object.

## Using Durable Objects

Durable Objects are named instances of a class you define.  Just like a class in object-oriented programming, the class defines the methods and data a Durable Object can access.

There are four steps to creating a Durable Object:

* __Writing the class__ that defines a Durable Object.
* __Binding that class__ into a Worker.
* __Instantiating a Durable Object__ from within a running Worker.
* __Communicating with a Durable Object__ from a running Worker via the Fetch API.

## Writing a class that defines a Durable Object

To define a Durable Object, developers export an ordinary Javascript class.  Other languages will need a shim that translates their class definition to a Javascript class.

The first variable passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage.

```js

class DurableObjectExample {
    constructor(state, environment){

    }
}

```

Workers communicate with a Durable Object via the fetch API.  Like any other Worker, a Durable Object listens for incoming Fetch events by registering an event handler.

```js

class DurableObjectExample {
    constructor(state, environment){
    }
    
    addEventListener("fetch", (event) => {
        event.respondWith(handle(event.request));
    });
 
    async function handle(request) {
        return new Response('Hello World');
    }

}

```

A Worker can pass information to a Durable Object via headers, the HTTP method, the Request body, or the Request URI.

### Accessing Storage from a Durable Object

Durable Objects gain access to a TODO: fill in[persistent storage API]() via the first parameter passed to the Durable Object constructor.  While access to a Durable Object is single-threaded, it's important to remember that there can still be race conditions across multiple requests.

```js

class DurableObjectExample {
    constructor(state, environment){
        this.state = state
    }
    
    addEventListener("fetch", (event) => {
        event.respondWith(handle(event.request));
    });
 
    async function handle(request) {
        let ip = request.headers.get('CF-Connecting-IP');
        let data = request.text();
        let storagePromise = this.state.storage.set(ip, data);
        await storagePromise;
        return new Response(ip + ' stored ' + data);
    }

}

```

Single statement transactions are always transactional.  More complex use cases can wrap multiple storage statements in a transaction.  

```js

class DurableObjectExample {
    constructor(state, environment){
        this.state = state
    }
    
    addEventListener("fetch", (event) => {
        event.respondWith(handle(event.request));
    });
 
    async function handle(request) {
        // TODO: txn example
    }

}

```

Transactions can fail if they conflict with a concurrent transaction from the same Durable Object.  Transactions are transparently and automatically retried once before returning a failure.


## Binding the class to a Worker

As with Workers KV, the class namespace must be created and then bound into a Worker before it can be used.

First, upload the script that contains the class via the Workers Dashboard or via the command line.

```sh
curl -i -H "X-Auth-Email: ${EMAIL}" -H "X-Auth-Key: ${AUTH_KEY}" "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_TAG}/workers/scripts/${SCRIPT_NAME}" -X PUT -H "Content-Type: application/javascript" --data "`cat durable_object_example.js`"
```

To create the class, call the following endpoint.

```sh
curl -i -H "X-Auth-Email: ${EMAIL}" -H "X-Auth-Key: ${AUTH_KEY}" "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_TAG}/workers/durable_objects/namespaces" -X POST --data "{'name': 'example-class', 'script': ${SCRIPT_NAME}"
```

You can now create a binding for the Worker which uses this class.  TODO: Not sure if this is still the correct syntax, check.

```js 
// binding.json
{
  "body_part": "script",
  "bindings": [
    {
      "type": "durable_object_namespace",
      "name": "example-class",
      "namespace_id": "<namespace id>"
    }
  ]
}

```


## Instantiating a Durable Object

Creating a Durable Object requires retrieving a Fetcher object from the class in your Workers Script.  Once you have the Fetcher object, you can use it to send [Requests](/runtime-apis/request) to the Durable Object instance.

```js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
 
async function handleRequest(request) {
  // Retrieve the Fetcher for the Durable Object with id 1
  let durableObject = await DURABLE_OBJECT_CLASS.get("1")
  // Send a request to Durable Object '1', with the URI "get-count"
  let resp = await durableObject.fetch("get-count")
  let count = await resp.text()
 
  // Regardless of the URI, requests are always routed to the Durable Object
  resp = await durableObject.fetch()
  let message = await resp.text()

  // TODO: system generated id example
  let id = generateId()
  let sysDurableObject = await DURABLE_OBJECT_CLASS.get()
  resp = await sysDurableObject.fetch('get-count')
  let sysCount = await resp.text()
 
  return new Response("Object '1' count: " + count + " and message " + message + ".  System Object '" + id + "' count: " + sysCount)
}

```

Learn more at the [Workers Durable Objects API reference](/runtime-apis/durable-objects).

## Limitations and considerations when working with Durable Objects

### Global Uniqueness

Uniqueness is currently enforced only when a Durable Object begins execution.  In the future, uniqueness will also be enforced whenever a Durable Object makes storage requests.  

During a network partition between data centers or between machines within a data center, it is possible for more than one Durable Object with a given id to be active.  While this is unlikely, we plan to do additional work to reduce the chance of a network partition during the beta period.

### Creation and Routing

Durable Objects use a deterministic hash of the Object's id to determine the Cloudflare point-of-presence that owns the Object.  It is not currently possible for an Object to migrate ownership to a different point-of-presence.

When using system generated ids, Durable Objects are created in a Cloudflare point-of-presence located near the Worker that made the creation request.

When using client-defined ids, Durable Objects may be created in any of Cloudflare's points-of-presence. Durable Object with client-defined ids will see greater variance in request latency across different Objects, as each Object may be routed to a different point-of-presence.  

When migrations of Objects are enabled, this variance in request latency will only affect Object creation.

### Transactional Storage API

The transactional storage API is scoped to a single Durable Object.  It is not currently possible to access data stored in a Durable Object from a different Durable Object directly through the API.

There is no support for querying, bulk loading, or exporting data stored in Durable Objects.

Applications should be prepared for transactions to fail due to conflicts, and to retry those failed transactions.  A failed transaction will throw an error (TODO: what error?  is this true?) that can be caught.  It is always safe to retry failed transactions.

### Performance

Durable Objects are single-threaded, but each Object has almost no overhead associated with it.  In general, this means your application should look to create and access many Durable Objects over sending many requests to the same Object.  Access patterns that make many requests to a single Object will see degraded performance.

Since Durable Objects are globally distributed, initial creation latency may be high when using user-generated ids (see above).  Until automatic migration of Durable Objects is implemented, latency will also be high on subsequent read and write operations.





