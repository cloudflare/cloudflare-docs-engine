---
order: 2
---

# addEventListener

This function defines triggers for a Worker script to execute.

The only type and event type supported are `"fetch"` and [`FetchEvent`](/reference/runtime-apis/fetch-event), respectively.

## Syntax

<Definitions>

- <Code>addEventListener(type, handler)</Code> <Type>void</Type>

  - If multiple event listeners are registered, when an event handler does not call `respondWith()` the runtime delivers the event to the next registered event handler.

</Definitions>

### Properties

<Definitions>

- `type` <Type>string</Type>
  - Currently the only type supported is `"fetch"`.

- `handler` <TypeLink href="/reference/runtime-apis/fetch-event">FetchEvent</TypeLink>
  - The event type for HTTP requests dispatched to a Worker (i.e the `Object` passed through as `event` in [`addEventListener()`](/runtime-apis/add-event-listener).

</Definitions>
