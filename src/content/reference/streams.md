---
weight: 5
---

# Streams

## Background

Workers scripts don’t need to prepare an entire response body before delivering it to `event.respondWith()`. You can use `TransformStream` to stream a response body _after_ sending the front matter (that is, HTTP status line and headers). This allows you to minimize:

- The visitor’s time-to-first-byte.
- The buffering done in the Workers script.

Minimizing buffering is especially important for processing or transforming response bodies larger than the Workers script memory limit. For these cases, streaming is the only implementation strategy.

By default, the Cloudflare Workers service streams. Only use these APIs for _modifying_ the response body while maintaining streaming behavior. If your Workers script only passes subrequest responses back to the client verbatim without reading their body text, then its body handling is already optimal and you don’t have to use these APIs.

<Aside>

__Note:__ The Streams API is only available inside of [the Request Context](/about/tips/request-context).

</Aside>

--------------------------------

## Streaming Passthrough

The two primitives developers use to perform active streaming are `TransformStream` and the [`ReadableStream.pipeTo()`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeTo) method.

**Example of basic minimal passthrough usage:**

```javascript
addEventListener('fetch', event => {
  event.respondWith(fetchAndStream(event.request))
})

async function fetchAndStream(request) {
  // Fetch from origin server.
  let response = await fetch(request)

  // Create an identity TransformStream (a.k.a. a pipe).
  // The readable side will become our new response body.
  let { readable, writable } = new TransformStream()

  // Start pumping the body. NOTE: No await!
  response.body.pipeTo(writable)

  // ... and deliver our Response while that’s running.
  return new Response(readable, response)
}
```

Note that we call `response.body.pipeTo(writable)` but do _not_ `await` it. This is so it does not block the forward progress of the remainder of the `fetchAndStream()` function. It continues to run asynchronously until the response is complete or the client disconnects.

The runtime can continue running a function (`response.body.pipeTo(writable)`) after a response is returned to the client. This example just pumps the subrequest response body to the final response body; however, you can use more complicated logic, such as adding a prefix or a suffix to the body or to process it somehow.

--------------------------------

## Types

### TransformStream

#### Properties

<Definitions>

- `readable` <Type>ReadableStream</Type>
    - An instance of a `ReadableStream`.
- `writable` <Type>WritableStream</Type>
    - An instance of a `WritableStream`.

</Definitions>

--------------------------------

### ReadableStream

<Aside>

__Note:__ A `ReadableStream` is returned by the `readable` property inside `TransformStream`. On the Workers platform, `ReadableStream` 
cannot be created directly using the `ReadableStream` constructor.

</Aside>

#### Properties

<Definitions>

- `locked` <Type>boolean</Type>
  - A Boolean value that indicates if the readable stream is locked to a reader.

</Definitions>

#### Methods

##### `pipeTo(destination)` <Type>Promise</Type>

- Pipes the readable stream to a given writable stream `destination` and returns a promise that is fulfilled when the `write` operation succeeds or rejects it if the operation fails.

###### Parameters

<Definitions>

  - `destination` <Type>WriteableStream</Type>
    - The given destination to stream to.
  

##### `getReader(options)` <Type>ReadableStreamDefaultReader</Type>

</Definitions>

```javascript
let reader = readable.getReader({ mode: 'byob' })
```

Gets an instance of `ReadableStreamDefaultReader` and locks the `ReadableStream` to that reader instance. This method accepts an object argument indicating _options_. 

###### Parameters

<Definitions>

- `options` <Type>Object</Type>
  -  We only support one `mode`, which can be set to `byob` to create a `ReadableStreamBYOBReader`.

</Definitions>

--------------------------------

### ReadableStreamDefaultReader

#### Properties

<Definitions>

- `closed` <Type>Promise</Type>
  -  A promise indicating if the reader is closed. The promise is fulfilled when the reader stream closes, and is rejected if there is an error in the stream.

</Definitions>

#### Methods

<Definitions>

- `read()` <Type>Promise</Type>
  - A promise that returns the next available chunk of data being passed through the reader queue.
- `cancel(reason)` <Type>void</Type>
  - Cancels the stream.
    - `reason` <Type>string</Type> <PropMeta>optional</PropMeta>
      - An optional string (intended to be human-readable) to indicate the reason for cancellation. 

    <Aside>
    
    __Note:__ Any data not yet read is lost.

    </Aside>

- `releaseLock()` <Type>void</Type>
  - Releases the lock on the readable stream. A lock can’t be released if the reader has pending read operations. A `TypeError` is thrown and the reader remains locked.
 
</Definitions>

### ReadableStreamBYOBReader

<Aside>

__Note:__ An instance of `ReadableStreamBYOBReader` created by passing the `byob` mode to `getReader` on an instance of `ReadableStream`, is functionally identical to `ReadableStreamDefaultReader` with the exception of the `read` method.

</Aside>

#### Methods

<Definitions>

- `read(buffer)` <Type>Promise</Type>
  - Returns a promise with the next available chunk of data read into a passed-in buffer.
    - `buffer` <Type>Buffer</Type>
      - The buffer to store the next available chunk of data into from the reader.

</Definitions>

--------------------------------

### WritableStream

<Aside>

__Note:__ A `WritableStream` returns as the `writable` property inside `TransformStream`. On the Workers platform, `WritableStream` can’t be directly created using the `WritableStream` constructor.

</Aside>

#### Properties

<Definitions>

- `locked` <Type>boolean</Type>
  - A Boolean value to indicate if the writable stream is locked to a writer.

</Definitions>

#### Methods

<Definitions>

- `abort(reason)` <Type>Promise</Type>
  
  - Aborts the stream. This method returns a promise that fulfills with a response `undefined`. 
  
  - `reason` <Type>string</Type>
  
    -  An optional `reason` string (intended to be human-readable) to indicate the reason for cancellation
  
  <Aside>

    __Note:__ Any data yet written is lost.

  </Aside>
 
- 
- `getWriter()` <Type>WritableStreamDefaultWriter</Type>
  
  - Gets an instance of `WritableStreamDefaultWriter` and locks the `WritableStream` to that writer instance.

</Definitions>

--------------------------------

### WritableStreamDefaultWriter

#### Properties

<Definitions>

- `desiredSize` <Type>int</Type>
  
  - The size needed to fill the stream’s internal queue, as an integer. Always returns 1, 0 (if the stream is closed), or `null` (if the stream has errors).

- `closed`<Type>Promise</Type>
 
  - A promise that indicates if the writer is closed. The promise is fulfilled when the writer stream is closed and rejected if there is an error in the stream.

</Definitions>

#### Methods

<Definitions>

- `abort(reason)` <Type>Promise</Type>
  
  - If the writer is active, aborting it is similar to the `abort` method used in `WritableStream`. This method returns a promise that fulfills with `undefined`.

    - `reason` <Type>string</Type>

        - An optional `reason` string can be passed (intended to be human-readable) to indicate the reason for cancellation. 


  <Aside>

  __Note:__ Any data not yet written is lost.

  </Aside>

- `close()` <Type>Promise</Type>

  - Attempts to close the writer. Remaining writes finish processing before the writer is closed. This method returns a promise fulfilled with `undefined` if the writer successfully closes and processes the remaining writes, or rejected on any error.

- `releaseLock()` <Type>void</Type>
  
  - Releases the writer’s lock on the stream. Once released, the writer is no longer active. You can call this method _before_ all pending `write(chunk)` calls are resolved. This allows you to queue a `write` operation, release the lock, and begin piping into the writable stream from another source, as shown in the example below.


```javascript
let writer = writable.getWriter()
// Write a preamble.
writer.write(new TextEncoder().encode('foo bar'))
// While that’s still writing, pipe the rest of the body from somewhere else.
writer.releaseLock()
await someResponse.body.pipeTo(writable)
```

- `write(chunk)` <Type>Promise</Type> 
  
  - Writes a chunk of data to the writer and returns a promise to indicate if the operation succeeded or failed.

  - `chunk` <Type>?</Type>

    - The chunk of data to be written.

</Definitions>

--------------------------------

## Common issues

Sometimes you’ll find that when you create instances of `Class`, unexpected things happen. It’s important to remember that you can always [debug your `Class`](#learning-page-about-debugging).

--------------------------------

## See also

- [`RelatedClass`](#)
- [`OtherRelatedClass`](#)
- [An external link to relevant documentation, e.g. on MDN](https://example.com)
- [A page about writing JS in general](#)
