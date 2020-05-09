---
title: fetch
weight: 2
---

## Overview

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asyncronously fetching resources by providing a definition of a request and response. You will frequently find yourself interacting with request objects included as part of a [FetchEvent](/reference/apis/fetch-event), making your own requests using the global `fetch` method, and constructing your own responses.

\*_Note: The Fetch API is only available inside of [the Request Context](/about/tips/request-context)._

## Global

The `fetch` method is implemented on the ServiceWorkerGlobalScope and matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

## Headers

The Headers class matches the documentation [provided by MDN](https://developer.mozilla.org/en-US/docs/Web/API/Headers). If you expect Unicode values in your headers, URL or Base64 encode your header values before adding them to a Headers object.

#### Cloudflare Specific Headers

`CF-Connecting-IP`: The client IP
