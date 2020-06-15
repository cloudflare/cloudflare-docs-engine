# Request

## Constructor

```javascript
let request = new Request(input [, init])
```

### Parameters

<Definitions>

- `input` <Type>string | Request</Type>

  - Either a String that contains a URL, or an existing `Request` object.

- `init` [<Type>RequestInit</Type>](#requestinit) <Type>Optional</Type>

  - Optional options object that contains settings to apply to the `Request`. [Valid keys are listed below](#init-object).

</Definitions>

#### `RequestInit`

<Definitions>

- `cf` [<Type>RequestInitCfProperties</Type>](#requestinitcfproperties) <Type>Optional</Type>

  - Cloudflare-specific properties that can be set on the `Request` that control how Cloudflare's edge handles the request.

- `method` <Type>string</Type> <Type>Optional</Type>

  - The HTTP request method. The default is `GET`.

- `headers` <Type>Headers</Type> <Type>Optional</Type>

  - A [`Headers` object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

- `body` <Type>string | ReadableStream | FormData | URLSearchParams</Type> <Type>Optional</Type>

  - The request body, if any.

- `redirect` <Type>string</Type> <Type>Optional</Type>

  - The redirect mode to use: `follow`, `error`, or `manual`. The default is `follow`.

</Definitions>

#### `RequestInitCfProperties`
An object containing Cloudflare-specific properties that can be set on the `Request` object.

For example:
```javascript
// Disable ScrapeShield for this request.
fetch(event.request, { cf: { scrapeShield: false } })
```

Invalid or incorrectly-named keys in the `cf` object will be silently ignored. Consider using TypeScript and [`@cloudflare/workers-types`](https://github.com/cloudflare/workers-types) to ensure you're using the `cf` object properly. 

<Definitions>

- `apps` <Type>boolean</Type>

  - Whether [Cloudflare Apps](https://www.cloudflare.com/apps/) should be enabled for this request. Defaults to `true`.

- `cacheEverything` <Type>boolean</Type>

  - This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting the page rule ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266). Defaults to `false`.

- `cacheKey` <Type>string</Type>

  - A request's cache key is what determines if two requests are "the same" for caching purposes. If a request has the same cache key as some previous request, then we can serve the same cached response for both.

- `cacheTtl` <Type>number</Type>

  - This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two page rules: ["Edge Cache TTL"](https://support.cloudflare.com/hc/en-us/articles/200168376-What-does-edge-cache-expire-TTL-mean-) and ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266).

- `cacheTtlByStatus` <Type>{ [key: string]: number }</Type>

  - This option is a version of the `cacheTtl` feature which chooses a TTL based on the response's status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache instructives sent by the origin. For example: `{ "200-299": 86400, 404: 1, "500-599": 0 }`.

- `minify` <Type>{ javascript?: boolean; css?: boolean; html?: boolean; }</Type>

  - Enables or disables [AutoMinify](https://www.cloudflare.com/website-optimization/) for various file types. For example: `{ javascript: true, css: true, html: false }`.

- `mirage` <Type>boolean</Type>

  - Whether [Mirage](https://www.cloudflare.com/website-optimization/mirage/) should be enabled for this request, if otherwise configured for this zone. Defaults to `true`.

- `polish` <Type>string</Type>

  - Sets [Polish](https://blog.cloudflare.com/introducing-polish-automatic-image-optimizati/) mode. The possible values are `lossy`, `lossless` or `off`.

- `resolveOverride` <Type>string</Type>

  - Redirects the request to an alternate origin server.

- `scrapeShield` <Type>boolean</Type>

  - Whether [ScrapeShield](https://blog.cloudflare.com/introducing-scrapeshield-discover-defend-dete/) should be enabled for this request, if otherwise configured for this zone. Defaults to `true`.

</Definitions>

## Properties

All properties of an incoming `Request` object (i.e. `event.request`) are read only. To [modify a request](/templates/pages/modify_req_props/), you must create a new `Request` object and pass the options to modify to its [constructor](#constructor).

<Definitions>

- `body` <Type>ReadableStream</Type> <Type>Read only</Type>

  - Stream of the body contents.

- `bodyUsed` <Type>Boolean</Type> <Type>Read only</Type>

  - Declares whether the body has been used in a response yet.

- `cf` [<Type>IncomingRequestCfProperties</Type>](#incomingrequestcfproperties) <Type>Read only</Type>

  - An object containing properties about the incoming request provided by Cloudflare's edge network.

- `headers` <Type>Headers</Type> <Type>Read only</Type>

  - A [`Headers` object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

- `method` <Type>string</Type> <Type>Read only</Type>

  - Contains the request's method, e.g. `GET`, `POST`, etc.

- `redirect` <Type>string</Type> <Type>Read only</Type>

  - Contains the mode for how redirects are handled. It may be one of `follow`, `error`, or `manual`.

- `url` <Type>string</Type> <Type>Read only</Type>

  - Contains the URL of the request.

</Definitions>

### `IncomingRequestCfProperties`

In addition to the properties on the standard [`Request`](/reference/apis/request) object, the `request.cf` object on an inbound `Request` contains information about the request provided by Cloudflare's edge.

<Definitions>

- `asn` <Type>string</Type>

  - ASN of the incoming request, e.g. `395747`.

- `colo` <Type>string</Type>

  - The three-letter airport code of the data center that the request hit, e.g. `"DFW"`.

- `tlsCipher` <Type>string</Type>

  - The cipher for the connection to Cloudflare, e.g. `"AEAD-AES128-GCM-SHA256"`.

- `country` <Type>string</Type>

  - Country of the incoming request. The two-letter country code in the request. This is the same value as that provided in the `CF-IPCountry` header, e.g. `"US"`.

- `tlsClientAuth` <Type>Object | null</Type>

  - Only set when using Cloudflare Access. Object with the following properties: `certIssuerDNLegacy`, `certIssuerDN`, `certIssuerDNRFC2253`, `certSubjectDNLegacy`, `certVerified`, `certNotAfter`, `certSubjectDN`, `certFingerprintSHA1`, `certNotBefore`, `certSerial`, `certPresented`, `certSubjectDNRFC2253`.

- `tlsVersion` <Type>string</Type>

  - The TLS version of the connection to Cloudflare, e.g. `TLSv1.3`.

- `requestPriority` <Type>string</Type>

  - The browser-requested prioritization information in the request object, e.g. `“weight=192;exclusive=0;group=3;group-weight=127”`.

- `city` <Type>string | null</Type>

  - City of the incoming request, e.g. `"Austin"`.

- `continent` <Type>string</Type>

  - Continent of the incoming request, e.g. `"NA"`.

- `httpProtocol` <Type>string</Type>

  - HTTP Protocol, e.g. `"HTTP/2"`.

- `latitude` <Type>string | null</Type>

- Latitude of the incoming request, e.g. `"30.27130"`.

- `longitude` <Type>string | null</Type>

  - Longitude of the incoming request, e.g. `"-97.74260"`.

- `postalCode` <Type>string | null</Type>

  - Postal code of the incoming request, e.g. `"78701"`.

- `metroCode` <Type>number | null</Type>

  - Metro code (DMA) of the incoming request, e.g. `"635"`.

- `region` <Type>string | null</Type>

  - If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request, e.g. `"Texas"`.

- `regionCode` <Type>string</Type>

  - If known, the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the first level region associated with the IP address of the incoming request, e.g. `"TX"`.

- `timezone` <Type>string</Type>

  - Timezone of the incoming request, e.g. `"America/Chicago"`.

</Definitions>


## Methods

<Definitions>

- `Request.clone()` <Type>Promise&lt;Request></Type>

  - Creates a copy of the current `Request` object.

- `arrayBuffer()` <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer) representation of the request body.

- `formData()` <Type>Promise&lt;FormData></Type>

  - Returns a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) representation of the request body.

- `json()` <Type>Promise&lt;Object></Type>

  - Returns a promise that resolves with a JSON representation of the request body.

- `text()` <Type>Promise&lt;string></Type>

  - Returns a promise that resolves with a string (text) representation of the request body.

</Definitions>

## Examples

* [Modify Request Property](/templates/pages/modify_req_props)
* [Aggregate Requests](/templates/pages/aggregate_requests)
* [Signed Request/Response](/templates/pages/signed_request)


## TODO

* The "Random Notes" below need a home somewhere else, or a decision to punt.
* Is my approach to e.g. the RequestInit, RequestInitCfProperties, IncomingRequestCfProperties sensible? Previously, these were just furhter-indented lists. This feels like it scales better.
* Is it OK for Types to be links too? Does that need design tweaking?
* Should we include inline examples?


### Random Constructor Notes

- Note that the `url` property is immutable, so when [modifying a request](/templates/pages/modify_req_props/) and changing the URL, you must pass the new URL in this parameter.
- If you expect Unicode values in your headers, URL or Base64 encode your header values before adding them to a Headers object.
- `CF-Connecting-IP`: A Cloudflare specific header to specify the client IP
  - **Note:** Requests using the `GET` or `HEAD` methods cannot have a body.
  - **Note:** default `redirect` value for requests generated from the incoming `fetchEvent` from the event handler is `manual`. Default for newly constructed Requests (i.e. `new Request(url)` ) is `follow`. Valid `redirect` values:
    - `follow: boolean`: If a redirect reponse is returned to the fetch, another fetch will be fired based on the `Location` header in the response until a non-redirect code is returned. (i.e. `await fetch(..)` could never return a `301` redirect)
    - `manual: boolean`: redirect responses will return from a fetch
    
### Random `RequestInitCfProperties` object Notes

- `cacheTtl` <Type>number</Type>

  - This option forces Cloudflare to cache the response for this request, regardless of what headers are seen on the response. This is equivalent to setting two page rules: ["Edge Cache TTL"](https://support.cloudflare.com/hc/en-us/articles/200168376-What-does-edge-cache-expire-TTL-mean-) and ["Cache Level" (to "Cache Everything")](https://support.cloudflare.com/hc/en-us/articles/200172266).

- `cacheTtlByStatus` <Type>{ [key: string]: number }</Type>

  - This option is a version of the `cacheTtl` feature which chooses a TTL based on the response's status code. If the response to this request has a status code that matches, Cloudflare will cache for the instructed time, and override cache instructives sent by the origin. (e.g. `{ "200-299": 86400, 404: 1, "500-599": 0 }`) _Note - Cloudflare will still adhere to [standard cache levels](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-Cloudflare-What-to-Cache-), so by default this will override cache behavior for static files. If you wish to cache non-static assets, you will need to set a [Cache Level of Cache Everything](https://support.cloudflare.com/hc/en-us/articles/200172266-What-do-the-custom-caching-options-mean-in-Page-Rules-) using a Page Rule._

- `resolveOverride` <Type>string</Type>

  - Redirects the request to an alternate origin server. You can use this, for example, to implement load balancing across several origins. (e.g.`us-east.example.com`). _Note - For security reasons, the hostname set in `resolveOverride` must be proxied on the same Cloudflare zone of the incoming request. Otherwise, the setting is ignored. CNAME hosts are allowed, so to resolve to a host under a different domain or a DNS only domain first declare a CNAME record within your own zone’s DNS mapping to the external hostname, set proxy on Cloudflare, then set resolveOverride to point to that CNAME record._
