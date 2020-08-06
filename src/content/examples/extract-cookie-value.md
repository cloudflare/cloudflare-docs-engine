---
type: example
summary: Get the value of a cookie.
demo: https://extract-cookie-value.workers-sites-examples.workers.dev
tags:
  - API
  - JSON
  - Originless
---

# Extract cookie value

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const COOKIE_NAME = "__uid"

/**
 * Gets the cookie with the name from the request headers
 * @param {Request} request incoming Request
 * @param {string} name of the cookie to get
 */
function getCookie(request, name) {
  let result = ""
  const cookieString = request.headers.get("Cookie")
  if (cookieString) {
    const cookies = cookieString.split(";")
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim()
      if (cookieName === name) {
        const cookieVal = cookie.split("=")[1]
        result = cookieVal
      }
    })
  }
  return result
}

function handleRequest(request) {
  const cookie = getCookie(request, COOKIE_NAME)
  if (cookie) {
    // Respond with the cookie value
    return new Response(cookie)
  }
  return new Response("No cookie with name: " + COOKIE_NAME)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

<!-- ## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="395"/> -->
