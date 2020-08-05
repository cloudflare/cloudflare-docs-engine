---
type: example
summary: Check signatures of requests and sign responses with a private key.
demo: https://accessing-the-cloudflare-object.workers-sites-examples.workers.dev
tags:
  - API
  - JSON
  - Originless
---

# Signed request/response

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// NOTE Requires ESM through webpack project type
const crypto = require("crypto")
const SECRET = "SECRET_KEY"

async function handleRequest(request) {
  let signed = await checkSignature(request)

  if (signed) {
    let responseBody = "Hello worker!"
    return await signResponse(responseBody, new Response(responseBody))
  }
  else {
    return new Response("Request not signed", { status: 400 })
  }
}

async function createHexSignature(requestBody) {
  let hmac = crypto.createHmac("sha256", SECRET)
  hmac.update(requestBody)
  return hmac.digest("hex")
}

async function checkSignature(request) {
  // hash request with secret key
  let expectedSignature = await createHexSignature(await request.text())
  let actualSignature = await request.headers.get("signature")

  // check that hash matches signature
  return expectedSignature === actualSignature
}

async function signResponse(responseBody, response) {
  // create signature
  const signature = await createHexSignature(responseBody)
  response.headers.set("signature", signature)

  //add header with signature
  return response
}

addEventListener("fetch", event => {
  console.log(createHexSignature("asd"))
  event.respondWith(handleRequest(event.request))
})
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="395"/>
