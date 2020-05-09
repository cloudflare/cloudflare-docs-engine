---
title: Request
weight: 4
---

### Constructor

#### Syntax

```javascript
new Request(input [, init])
```

#### Constructor Parameters

- `input`: Either a USVString that contains the URL or an existing `Request` object. Note that the `url` property is immutable, so when [modifying a request](/templates/snippets/modify_req_props/) and changing the URL, you must pass the new URL in this parameter.

- `init` (optional): An options object that contains custom settings to apply to the request. Valid options are:
  - `method`: The request method, such as `GET` or `POST`
  - `headers`: A [Headers](/reference/apis/fetch#headers) object
    - `body`: Any text to add to the request. **Note:** Requests using the `GET` or `HEAD` methods cannot have a body.
    - `redirect`: The mode respected when the request is fetched. **Note:** default for requests generated from the incoming `fetchEvent` from the event handler is `manual`. Default for newly constructed Requests (i.e. `new Request(url)` ) is `follow`. Valid options:
    - `follow`: If a redirect reponse is returned to the fetch, another fetch will be fired based on the `Location` header in the response until a non-redirect code is returned. (i.e. `await fetch(..)` could never return a `301` redirect)
    - `manual`: redirect responses will return from a fetch

### Properties

All properties of an incoming `Request` object (i.e. `event.request`) are read only. To [modify a request](/templates/snippets/modify_req_props/), you must create a new `Request` object and pass the options to modify to its [constructor](#Constructor).

- `body`: A simple getter that exposes a [`ReadableStream`](/reference/apis/streams) of the contents.
- `bodyUsed`: A Boolean that declares if the body has been used in a response.
- `cf`: An object that contains data provided by Cloudflare (see `request.cf` below).
- `headers`: Contain the associated [`Headers`](/reference/apis/fetch#headers) object for the request.
- `method`: The request method, such as `GET` or `POST`, associated with the request.
- `redirect`: The redirect mode to use: `follow` or `manual`.
- `url`: Contains the URL of the request.

#### The `cf` Object

In addition to the properties on the standard [`Request`](/reference/apis/request) object, you can use a `request.cf` object to control how Cloudflare features are applied as well as other custom information provided by Cloudflare.

Note: Currently, settings in the cf object cannot be tested in the playground.

Special information from an incoming request to help with your app's logic. All plans have access to:

- `asn`: ASN of the incoming request. (e.g. `395747`)
- `colo`: The three-letter airport code of the data center that the request hit. (e.g. `"DFW"`)
- `weight:` The browser-requested weight for the HTTP/2 prioritization.
- `exclusive:` The browser-requested HTTP/2 exclusive flag (1 for Chromium-based browsers, 0 for others).
- `group:` HTTP/2 stream ID for the request group (only non-zero for Firefox).
- `group-weight`: HTTP/2 weight for the request group (only non-zero for Firefox).
- `tlsCipher`: The cipher for the connection to Cloudflare. (e.g. `"AEAD-AES128-GCM-SHA256"`)
- `country`: Country of the incoming request. The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header. (e.g. `"US"`)
- `tlsClientAuth`: Only set when using Cloudflare Access. Object with the following properties: `certIssuerDNLegacy`, `certIssuerDN`, `certIssuerDNRFC2253`, `certSubjectDNLegacy`, `certVerified`, `certNotAfter`, `certSubjectDN`, `certFingerprintSHA1`, `certNotBefore`, `certSerial`, `certPresented`, `certSubjectDNRFC2253`
- `tlsVersion`: The TLS version of the connection to Cloudflare (e.g. `TLSv1.3`)

**Business and Enterprise** scripts have access to:

- `requestPriority`: The browser-requested prioritization information in the request object. (e.g. `“weight=192;exclusive=0;group=3;group-weight=127”`)
- `city`: City of the incoming request. (e.g. `"Austin"`)
- `continent`: Continent of the incoming request. (e.g. `"NA"`)
- `httpProtocol`: HTTP Protocol (e.g. `"HTTP/2"`)
- `latitude`: Latitude of the incoming request. (e.g. `"30.27130"`)
- `longitude`: Longitude of the incoming request. (e.g. `"-97.74260"`)
- `postalCode`: PostalCode of the incoming request. (e.g. `"78701"`)
- `region`: If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request. If not known, this is an empty string. (e.g. `"Texas"`)
- `regionCode`: If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the first level region associated with the IP address of the incoming request. 1 If not known, this is an empty string. (e.g. `"TX"`)
- `timezone`: Timezone of the incoming request. (e.g. `"America/Chicago"`)

Cloudflare features all plans can set on outbound requests:

- `cacheEverything`:This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting the page rule ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266). (e.g. `true`)
- `scrapeShield`: Toggles [ScrapeShield](https://blog.cloudflare.com/introducing-scrapeshield-discover-defend-dete/). (e.g. `false`)
- `polish`: Sets [Polish](https://blog.cloudflare.com/introducing-polish-automatic-image-optimizati/) mode. The possible values are "lossy", "lossless" or "off". (e.g. `lossless`)
- `minify`: Enables or disables [AutoMinify](https://www.cloudflare.com/website-optimization/) for various file types. The value is an object containing Boolean fields for `javascript`, `css`, and `html`. (e.g. `{ javascript: true, css: true, html: false }`)
- `mirage`: Disables [Mirage](https://www.cloudflare.com/website-optimization/mirage/) for this request. When you specify this option, the value should always be `false`. (e.g. `false`)
- `apps`: Disables [Cloudflare Apps](https://www.cloudflare.com/apps/) for this request. When you specify this option, the value should always be `false`. (e.g. `false)`
- `cacheTtl`: This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two page rules: ["Edge Cache TTL"](https://support.cloudflare.com/hc/en-us/articles/200168376-What-does-edge-cache-expire-TTL-mean-) and ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266). (e.g.`300`)
- `resolveOverride`: Redirects the request to an alternate origin server. You can use this, for example, to implement load balancing across several origins. (e.g.`us-east.example.com`)
  - _Note - For security reasons, the hostname set in `resolveOverride` must be proxied on the same Cloudflare zone of the incoming request. Otherwise, the setting is ignored. CNAME hosts are allowed, so to resolve to a host under a different domain or a DNS only domain first declare a CNAME record within your own zone’s DNS mapping to the external hostname, set proxy on Cloudflare, then set resolveOverride to point to that CNAME record._

**Enterprise only:**

- `cacheKey`: A request's cache key is what determines if two requests are "the same" for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both. (e.g. `'some-key'`)
- `cacheTtlByStatus`: This option is a version of the `cacheTtl` feature which chooses a TTL based on the response's status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache instructives sent by the origin. (e.g. `{ "200-299": 86400, 404: 1, "500-599": 0 }`)
  - _Note - Cloudflare will still adhere to [standard cache levels](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-Cloudflare-What-to-Cache-), so by default this will override cache behavior for static files. If you wish to cache non-static assets, you will need to set a [Cache Level of Cache Everything](https://support.cloudflare.com/hc/en-us/articles/200172266-What-do-the-custom-caching-options-mean-in-Page-Rules-) using a Page Rule._

A Workers script runs after Cloudflare security features, but before everything else. Therefore, a Workers script cannot affect the operation of security features (since they already finished), but it can affect other features, like Polish or ScrapeShield, or how Cloudflare caches the response.

Updating the `cf` object is similar to [modifying a request](/templates/snippets/modify_req_props//). You can add the `cf` object to a `Request` by passing a custom object to [`fetch`](/reference/apis/fetch/). For examples on controlling cache settings see [the template](/templates/pages/cache_ttl).

```javascript
// Disable ScrapeShield for this request.
fetch(event.request, { cf: { scrapeShield: false } })
```

Note: Invalid or incorrectly-named settings in the cf object will be silently ignored. Be careful to test that you are getting the behavior you want.

### Methods

- [`Request.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone): Creates a copy of the current `Request` object.
- `Request`: Implements [`Body`](https://developer.mozilla.org/en-US/docs/Web/API/Body) and has the following methods:
  - [`Body.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer): Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer) representation of the request body.
  - [`Body.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData): Returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) representation of the request body.
  - [`Body.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json): Returns a promise that resolves with a [`JSON`](https://developer.mozilla.org/en-US/docs/Web/API/JSON) representation of the request body.
  - [`Body.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text): Returns a promise that resolves with an [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) (text) representation of the request body.
