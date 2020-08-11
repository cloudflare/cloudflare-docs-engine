---
order: 1000
type: example
summary: Change the headers sent in a request or returned in a response.
demo: https://alter-headers.workers-sites-examples.workers.dev
tags:
  - API
  - JSON
  - Originless
---

# Rewrite links In HTML

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
async function handleRequest(request) {
  // Make the headers mutable by re-constructing the Request.
  request = new Request(request)
  request.headers.set("x-my-header", "custom value")
  const URL = "https://workers-tooling.cf/demos/static/html"

  // URL is set up to respond with dummy HTML
  let response = await fetch(URL, request)

  // Make the headers mutable by re-constructing the Response.
  response = new Response(response.body, response)
  response.headers.set("x-my-header", "custom value")
  return response
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

<!-- ## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="395"/> -->
