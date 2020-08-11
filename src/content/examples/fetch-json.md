---
type: example
summary: Sends a GET request and reads in JSON from the response.
demo: https://fetch-json.workers-sites-examples.workers.dev
tags:
  - Originless
---

# Fetch JSON

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * Example someHost is set up to take in a JSON request
 * Replace url with the host you wish to send requests to
 * @param {string} someHost the host to send the request to
 * @param {string} url the URL to send the request to
 */
const someHost = "https://workers-tooling.cf/demos"
const url = someHost + "/static/json"

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}

async function handleRequest() {
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  }
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  return new Response(results, init)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest())
})
```

<!-- ## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="150"/> -->
