---
order: 2
type: example
summary: Return JSON directly from a Worker script, useful for building APIs and middleware.
demo: https://returning-json.workers-docs-examples.workers.dev
tags:
  - JSON
  - API
  - Originless
---

# Returning JSON

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener("fetch", event => {
  const data = {
    hello: "world"
  }

  const json = JSON.stringify(data, null, 2)

  return event.respondWith(
    new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  )
})
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} height="80"/>
