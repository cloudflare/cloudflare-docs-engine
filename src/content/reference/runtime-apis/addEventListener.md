# addEventListener

## Background

This function defines triggers for a Worker script to execute. Currently the only event type supported is [`FetchEvent`](/reference/runtime-apis/fetch-event).

--------------------------------

## Methods

<Definitions>

- `addEventListener(type: 'fetch', handler: (event: `[`FetchEvent`](/reference/runtime-apis/fetch-event)`)):` <Type>void</Type>

  - If multiple event listeners are registered, when an event handler does not call `respondWith()` the runtime delivers the event to the next registered event handler.

</Definitions>