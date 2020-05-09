---
title: Response
weight: 4
---

### Constructor

#### Syntax

```javascript
new Response(body, init)
```

#### Parameters

- `body` (optional): An object that defines the body text for the response. Can be `null` or one of these values:
  - [`BufferSource`](https://developer.mozilla.org/en-US/docs/Web/API/BufferSource)
  - [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
  - [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)
  - [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
  - [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString)
- `init` (optional): An `options` object that contains custom settings to apply to the response. Valid options are:
  - `status`: The status code for the reponse, such as `200`.
  - `statusText`: The status message associated with the status code, like, `OK`. 
  - `headers`: Any headers to add to your response that are contained within a [`Headers`](/reference/apis/fetch#headers) object or object literal of [`ByteString`](https://developer.mozilla.org/en-US/docs/Web/API/ByteString) key/value pairs.

### Properties

- `body`: A simple getter used to expose a [`ReadableStream`](/reference/apis/streams) of the body contents.
- `bodyUsed`: A Boolean value that declares if the body was used in a response.
- `headers`: Contains the associated [Headers](/reference/apis/fetch#headers) object for the request.
- `ok`: Contains a Boolean value to indicate if the response was successful (status in the range 200-299).
- `redirected`: Indicates if the response is the result of a redirect, that is, its URL list has more than one entry.
- `status`: Contains the status code of the response (for example, `200` to indicate success).
- `statusText`: Contains the status message that corresponds to the status code (for example, `OK` for `200`).
- `url`: Contains the URL of the response. The value of the `url` property is the final URL obtained after any redirects.
- `webSocket`: This is present in successful WebSocket handshake responses. For example, if a client sends a WebSocket upgrade request to an origin and a worker intercepts the request and then forwards it to the origin and the origin replies with a successful WebSocket upgrade response, the worker sees `response.webSocket`. This establishes a WebSocket connection proxied through a worker. Note that you cannot intercept data flowing over a WebSocket connection.

### Methods

- [`Response.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone): Creates a clone of a [`Response`](#response) object.
- [`Response.redirect()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/redirect): Creates a new response with a different URL.
- [`Response`](#response): Implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body) and has the following methods available:
  - [`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer).
  - [`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
  - [`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with the result of parsing the body text as [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).
  - [`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text): Takes a [`Response`](#response) stream, reads it to completion, and returns a promise that resolves with a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text).
