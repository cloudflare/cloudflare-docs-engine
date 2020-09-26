# Durable Objects

## Background

Durable Objects provide low-latency coordination and consistent storage for the Workers platform.  A given Class can support essentially unlimited Durable Objects, with each Object having access to a transactional, key-value storage API.

Durable Objects consist of two components: a class that defines a template for creating Durable Objects and a Workers script that instantiates and uses those Durable Objects.  The class and the Workers script are linked together with a binding.

Learn more about [using Durable Objects](/learning/using-durable-objects).

--------------------------------

## Durable Object class definition

```js
export class DurableObject {
  constructor(state, env){

  }

  async fetch(request) {

  }
}
```
<Definitions>

- `controller`

  - Passed from the runtime to provide access to the Durable Object's storage as well as various metadata about the Object.

- `controller.storage`

  - Contains methods for accessing persistent storage via the transactional storage API. See [Transactional Storage API](#transactional-storage-api) for a detailed reference.

- `env`

  - Contains environment bindings configured for the Worker script, such as KV namespaces, secrets, and other Durable Object classes. Note that in traditional Workers not using ES Modules syntax, these same "bindings" appear as global variables within the script. Durable Object classes, though, always use ES Modules syntax, and have bindings delivered to the constructor rather than placed in global variables.

</Definitions>

### Transactional Storage API

Accessible via the `state.storage` object passed to the Durable Object constructor.

#### Methods
<Definitions>

- <code>get(key <ParamType>string</ParamType> | <ParamType>Array&lt;String></ParamType></code> <Type>Promise&lt;<ParamType>string</ParamType> | <ParamType>ReadableStream</ParamType> | <ParamType>ArrayBuffer</ParamType>></Type>

  - Retrieves the value associated with the given key.  Implicitly wrapped inside of a transaction.

- <code>put(key <ParamType>string</ParamType>, value <ParamType>string</ParamType> | <ParamType>ReadableStream</ParamType> | <ParamType>ArrayBuffer</ParamType>)</code>

  - Stores the value and associates it with the given key.  Implicitly wrapped inside of a transaction.

- <code>delete(key <ParamType>string</ParamType>)</code> <Type>Promise</Type>

  - Deletes the key and associated value.

- <code>list()</code> <Type>Promise</Type>

  - Returns all keys associated with the current Durable Object.

- <code>transaction(closure <ParamType>Function(txn)</ParamType>)</code> <Type>Promise</Type>

 - Runs the sequence of storage operations called on `txn` in a single transaction that either commits successfully or aborts.  Failed transactions are retried automatically.  Non-storage operations that affect external state, like calling Fetch, may execute more than once if the transaction is retried.

- `txn`

  - Provides access to `put()`, `get()`, `delete()` and `list()` methods to run in the current transaction context.


</Definitions>


--------------------------------

## Accessing a Durable Object from a Worker

--------------------------------

## Methods

TODO: create, get, fetch methods.