---
type: example
summary: Determine how/if to cache a resource by setting TTLs, custom cache keys, and cache headers in a fetch request to gain granular control of browsers' and Cloudflare's caches for even your dynamic assets like caching HTML.
demo: https://redirect.workers-sites-examples.workers.dev
tags:
  - Originless
---

# Cache using Fetch

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
async function handleRequest(request) {
  const url = new URL(request.url)

  // Only use the path for the cache key, removing query strings
  // and always store using HTTPS e.g. https://www.example.com/file-uri-here
  const someCustomKey = "https://${url.hostname}${url.pathname}"

  let response = await fetch(request, {
    cf: {
      // Always cache this fetch regardless of content type
      // for a max of 5 seconds before revalidating the resource
      cacheTtl: 5,
      cacheEverything: true,
      //Enterprise only feature, see Cache API for other plans
      cacheKey: someCustomKey,
    },
  })
  // Reconstruct the Response object to make its headers mutable.
  response = new Response(response.body, response)
  
  //Set cache control headers to cache on browser for 25 minutes
  response.headers.set("Cache-Control", "max-age=1500")
  return response
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="150"/>
