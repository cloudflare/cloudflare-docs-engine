---
order: 2
---

# addEventListener

## Background

This function defines triggers for a Worker script to execute.

The only type and event type supported are `"fetch"` and [`FetchEvent`](/runtime-apis/fetch-event), respectively.

## Syntax

<Definitions>

- <Code>addEventListener(type, listener)</Code> <Type>void</Type>

  - If multiple listeners are registered, when one doesn’t call [`event.respondWith()`](/runtime-apis/fetch-event#methods), the runtime delivers the event to the next registered listener.

</Definitions>

### Properties

<Definitions>

- `type` <Type>string</Type>
  - Currently the only type supported is `"fetch"`.

- `listener` <Type>function</Type>
  - The function to handle incoming requests to the Worker script. The listener is passed a single argument:

    <Definitions>

    - `event` <TypeLink href="/runtime-apis/fetch-event">FetchEvent</TypeLink>

      - The HTTP event for requests dispatched to a Worker. See [`FetchEvent`](/runtime-apis/fetch-event).

    </Definitions>

</Definitions>

## Example

```js
addEventListener("fetch", event => {
  return event.respondWith(
    new Response("Hello world")
  )
})
```
