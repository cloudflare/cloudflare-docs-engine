---
order: 2
---
# FetchEvent
The event type for HTTP requests dispatched to a Worker (i.e the `Object` passed through as `event` in [`addEventListener()`](/reference/apis/addEventListener).

## Usage

```js
addEventListener('fetch', (event) => {
  event.respondWith(eventHandler(event))
})
```

### Properties

<Definitions>

- `event.type` <Type>string</Type>
    - The type of event.

- `event.request` <TypeLink href="/reference/request">Request</TypeLink>
    - The incoming HTTP request triggering `FetchEvent`.

</Definitions>

### Methods

When a Workers script receives a request, the Workers runtime triggers a FetchEvent which may then be handled by any event listeners registered for the type `'fetch'`. The event handler can invoke any of the following methods of the `event` object to control what happens next:

<Definitions>

-  <Code>event.respondWith(response <TypeLink href="/reference/request">Request</TypeLink> | <Type>Promise</Type>)</Code> <Type>void</Type>

    - Intercept the request and send a custom response. _If no event handler calls `respondWith()` the runtime attempts to request the origin as if no Worker script exists. If no origin is setup (e.g. workers.dev sites), then the Workers script must call `respondWith()` for a valid response._

- <Code>event.passThroughOnException()</Code> <Type>void</Type>

    - Prevents requests from failing due to an unhandled exception thrown by the Worker, causing it instead to [“fail open”](https://community.microfocus.com/t5/Security-Blog/Security-Fundamentals-Part-1-Fail-Open-vs-Fail-Closed/ba-p/283747). Instead of returning an error response, the runtime will proxy the request to the origin server as though the Worker was never invoked.

- <Code>event.waitUntil(promise <Type>Promise</Type>) </Code> <Type>void</Type>

    - Extend the lifetime of the event without blocking the `response` from being sent. Use this method to notify the runtime to wait for tasks (e.g. logging, analytics to third-party services, streaming and caching) that need to run longer than the usual time it takes to send a response.

</Definitions>

To learn more about using the `FetchEvent`, see [FetchEvent LifeCycle](/about/tips/fetch-event-lifecycle).