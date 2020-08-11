---
type: example
summary: Block other websites from linking to your content.
demo: https://hot-link-protection.workers-sites-examples.workers.dev
tags:
  - API
  - JSON
  - Originless
---

# Hot-link protection

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const HOMEPAGE_URL = "https://tutorial.cloudflareworkers.com/"
const PROTECTED_TYPE = "images/"

async function handleRequest(request) {
  // Fetch the original request
  const response = await fetch(request)

  // If it's an image, engage hotlink protection based on the
  // Referer header.
  const referer = request.headers.get("Referer")
  const contentType = response.headers.get("Content-Type") || ""

  if (referer && contentType.startsWith(PROTECTED_TYPE)) {
    // If the hostnames don't match, it's a hotlink
    if (new URL(referer).hostname !== new URL(request.url).hostname) {
      // Redirect the user to your website
      return Response.redirect(HOMEPAGE_URL, 302)
    }
  }

  // Everything is fine, return the response normally.
  return response
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

<!-- ## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="395"/> -->
