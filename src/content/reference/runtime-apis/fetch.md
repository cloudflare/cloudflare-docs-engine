
# Fetch

## Background

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides an interface for asynchronously fetching resources via HTTP requests inside of a Worker.

The `fetch` method is implemented on the ServiceWorkerGlobalScope. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for more information.

<Aside>

__Note:__ Asynchronous tasks such as `fetch` are not executed at the top level in a Worker script and must be executed within a FetchEvent handler such as [`respondWith`](/reference/fetch-event#methods). Learn more about [Request Contexts](/about/tips/request-context).

</Aside>

--------------------------------

## Constructor
<!-- This code example needs more work -->
```js
---
highlight: [8]
---
addEventListener('fetch', (event) => {
  // NOTE: can't use fetch here, as we're not in an async scope yet
  event.respondWith(eventHandler(event))
})

async function eventHandler(event) {
  // fetch can be awaited here since `event.respondWith()` waits for the Promise it receives to settle
  const resp = await fetch(event.request)
  return resp
}
```

<!-- Where do we have the return type in this format? -->
<Definitions>

- <Code>fetch()</Code><TypeLink href="/reference/apis/response">Promise{`<Response>`}</TypeLink>
  
  - Fetch returns a promise to a Response.
  
</Definitions>

--------------------------------

## Properties

<Definitions>

- `request` <TypeLink href="/reference/apis/request">Request</TypeLink> | <Type>string</Type>
  - The <TypeLink href="/reference/apis/request">Request</TypeLink> object or a string represents the URL to fetch.

- `init` <TypeLink href="/reference/apis/request#requestinit">RequestInit</TypeLink>
  - The content of the request.

</Definitions>

--------------------------------

## Methods

--------------------------------

## Common issues

Sometimes you’ll find that when you create instances of `Class`, unexpected things happen. It’s important to remember that you can always [debug your `Class`](#learning-page-about-debugging).

--------------------------------

## See also

- [`RelatedClass`](#)
- [`OtherRelatedClass`](#)
- [An external link to relevant documentation, e.g. on MDN](https://example.com)
- [A page about writing JS in general](#)

- [Fetch HTML](/templates/pages/fetch_html)
- [Fetch JSON](/templates/pages/fetch_json)
- [Cache using Fetch](/templates/pages/cache_ttl/) 

<!-- ## ToDo:
- Fix http://localhost:8000/reference/apis/fetch-event#methods and http://localhost:8000/about/tips/request-context links
[Fetch HTML](/templates/pages/fetch_html)
- [Fetch JSON](/templates/pages/fetch_json)
- [Cache using Fetch](/templates/pages/cache_ttl/)  -->