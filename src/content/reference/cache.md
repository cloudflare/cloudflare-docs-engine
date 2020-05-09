---
title: Cache API
weight: 10
---

## The Cache Object

The Cache API allows fine grained control of reading and writing from cache, and deciding exactly when to fetch data from your origin.

For each individual zone, the Cloudflare Workers runtime exposes a single global cache object: `caches.default`. Though this cache object persists on all of Cloudflare's data centers, objects are not replicated to any other data centers. Note this individualized zone cache object differs from Cloudflare's Global CDN, for details see: [Using the Cache](/about/using-cache).

### Syntax

This API is strongly influenced by the web browsers’ Cache API, but there are some important differences. For instance, Cloudflare Workers runtime exposes a single global cache object.

```javascript
let cache = caches.default
```

### In the Preview

The Service Workers Cache API is currently unimplemented in the Cloudflare Workers Preview. Cache API operations in the previewer will have no impact. To test, one must deploy the Worker on a zone.

### Methods

#### `put`

Adds to the cache a response keyed to the given request. Returns a promise that resolves to `undefined` once the cache stores the response.

##### Syntax

```javascript
cache.put(request, response)
```

##### Parameters

- `request`: Either a string or a [`Request`](/reference/apis/request) object to serve as the key. If a string is passed, it is interpreted as the URL for a new Request object.

- `response`: A [`Response`](/reference/apis/response) object to store under the given key.

##### Invalid parameters

- `cache.put` throws an error if:
  - the `request` passed is a method other than `GET`
  - the `response` passed is a `status` of [`206 Partial Content`](https://httpstatuses.com/206)
  - the `response` passed contains the header `Vary: _` (required by the Cache API specification)

##### Headers

Our implementation of the Cache API respects the following HTTP headers on the response passed to `put()`:

- `Cache-Control`: Controls caching directives. This is consistent with [Cloudflare Cache-Control Directives](https://support.cloudflare.com/hc/en-us/articles/115003206852-Origin-Cache-Control#h_4250342181031546894839080). See also [Expiring cache objects](#expiring-cache-objects).
- `Cache-Tag`: Allows resource purging by tag(s) later (Enterprise only).
- `ETag`: Allows `cache.match()` to evaluate conditional requests with `If-None-Match`.
- `Expires`: A string that specifies when the resource becomes invalid. See also [Expiring cache objects](#expiring-cache-objects).
- `Last-Modified`: Allows `cache.match()` to evaluate conditional requests with `If-Modified-Since`.

This differs from the web browser Cache API as they do not honor any headers on the request or response.

**Note:** Responses with `Set-Cookie` headers are never cached, because this sometimes indicates that the response contains unique data. To store a response with a `Set-Cookie` header, either delete that header or set `Cache-Control: private=Set-Cookie` on the response before calling `cache.put()`.

Use the `Cache-Control` method to store the response without the `Set-Cookie` header.

#### `match`

Returns a promise wrapping the response object keyed to that request.

##### Syntax

```javascript
cache.match(request, options)
```

##### Parameters

- `request`: The string or [`Request`](/reference/apis/request) object used as the lookup key. Strings are interpreted as the URL for a new `Request` object.

- `options`: Can contain one possible property: 
  - `ignoreMethod` (Boolean): Consider the request method a GET regardless of its actual value.

Unlike the browser Cache API, Cloudflare Workers do not support the `ignoreSearch` or `ignoreVary` options on `match()`. You can accomplish this behavior by removing query strings or HTTP headers at `put()` time.

Our implementation of the Cache API respects the following HTTP headers on the request passed to `match()`:

- `Range`: Results in a `206` response if a matching response is found. Your Cloudflare cache always respects range requests, even if an `Accept-Ranges` header is on the response.

- `If-Modified-Since`: Results in a `304` response if a matching response is found with a `Last-Modified` header with a value after the time specified in `If-Modified-Since`.

- `If-None-Match`: Results in a `304` response if a matching response is found with an `ETag` header with a value that matches a value in `If-None-Match`.

`cache.match()`: Never sends a subrequest to the origin. If no matching response is found in cache, the promise that `cache.match()` returns is fulfilled with `undefined`.

#### `delete`

Deletes the `Response` object from the cache and returns a `Promise` for a Boolean response:

- `true`: The response was cached but is now deleted
- `false`: The response was not in the cache at the time of deletion.

##### Syntax

```javascript
cache.delete(request, options)
```

##### Parameters

- `request`: The lookup key as a string or [`Request`](/reference/apis/request) object. String are interpreted as the URL for a new `Request` object.

- `options`: Can contain one of these properties:

    - `ignoreMethod` (Boolean): Consider the request method to `GET`, regardless of its actual value.

## More Information

[Using Cache](/about/using-cache)
