---
order: 4
type: example
summary: Respond to the Worker request with the response from another (example.com in this example).
demo: https://respond-with-another-site.workers-docs-examples.workers.dev
tags:
  - Proxy
---

# Respond with another site

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener('fetch', event => {
  return event.respondWith(
    fetch("https://example.com")
  )
})
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} aspectRatio={16/9}/>
