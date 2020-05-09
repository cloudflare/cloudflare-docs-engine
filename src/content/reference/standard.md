---
title: Web Standards
weight: 1
---

The Workers Runtime provides the following standardized APIs for use by scripts running at the Edge.

## JavaScript Standards

All of the [standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) supported by the current Google Chrome stable release are supported, with a few notable exceptions:

- `eval()` is not allowed for security reasons.
- `new Function` is not allowed for security reasons.
- `Date.now()` returns the time of the last I/O; it does not advance during code execution.

## Web Global APIs

The following methods are available per the [Worker Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope):

#### Base64 Utility Methods

[`atob()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob) - Decodes a string of data which has been encoded using base-64 encoding.

[`btoa()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa) - Creates a base-64 encoded ASCII string from a string of binary data.

#### Timers

[`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) - Schedules a function to execute every time a given number of milliseconds elapses.

[`clearInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval) - Cancels the repeated execution set using [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).

[`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) - Schedules a function to execute in a given amount of time.

[`clearTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout) - Cancels the delayed execution set using [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

\*_Note: Timers are only available inside of [the Request Context](/about/tips/request-context)._

#### Fetch global

[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) - Starts the process of fetching a resource from the network. See [FetchAPI](/reference/apis/fetch/). \*_Note: The Fetch API is only available inside of [the Request Context](/about/tips/request-context)._

## Encoding API

Both TextEncoder and TextDecoder support UTF-8 encoding/decoding.

[Go to the docs](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API)

## URL API

The URL API supports urls conforming to http and https schemes.

[Go to the docs](https://developer.mozilla.org/en-US/docs/Web/API/URL)

_Note: The Workers' Runtime's URL class behavior differs from the URL Spec documented above. If you'd like to use another URL implementation, you can [shim the URL class using webpack](/tooling/wrangler/webpack/#shimming-globals)._
