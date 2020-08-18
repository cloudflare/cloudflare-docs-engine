---
order: 1000
type: example
summary: Check the signature of a request and sign a response with a private key.
demo: https://returning-json.workers-sites-examples.workers.dev
tags:
  - Security
  - Originless
---

# Signed request

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// NOTE: Requires ESM through webpack project type
const crypto = require("crypto")
const SECRET = "SECRET_KEY"

async function handleRequest(request) {
  let signed = await checkSignature(request)
  if (signed) {
    let responseBody = "Hello worker!"
    return await signResponse(responseBody, new Response(responseBody))
  } else {
    return new Response("Request not signed", { status: 400 })
  }
}

async function createHexSignature(requestBody) {
  let hmac = crypto.createHmac("sha256", SECRET)
  hmac.update(requestBody)
  return hmac.digest("hex")
}

async function checkSignature(request) {
  // Hash request with secret key
  let expectedSignature = await createHexSignature(await request.text())
  let actualSignature = await request.headers.get("signature")
  // Check that hash matches signature
  return expectedSignature === actualSignature
}

async function signResponse(responseBody, response) {
  // Create signature
  const signature = await createHexSignature(responseBody)
  response.headers.set("signature", signature)
  // Add header with signature
  return response
}

addEventListener("fetch", event => {
  console.log(createHexSignature("asd"))
  event.respondWith(handleRequest(event.request))
})
```
