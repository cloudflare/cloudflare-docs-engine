# ScheduledEvent

## Background

The event type for Scheduled requests to a Worker. The `Object` passed through as `event` in [`addEventListener()`](/runtime-apis/add-event-listener).

## Context

```js
addEventListener("scheduled", event => {
  event.waitUntil(handleScheduled(event))
})
```

### Properties

<Definitions>

- `event.type` <Type>string</Type>
    - The type of event. This will always return `"scheduled"`.

- `event.scheduledTime` <Type>number</Type>
    - The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as <Code>new Date(event.scheduledTime)</Code>

</Definitions>

### Methods

When a Workers script is invoked by a [Cron Trigger](/platform/cron-triggers), the Workers runtime starts a `ScheduledEvent` which will be handled by the event listener registered for the type `"scheduled"`. The event handler can invoke the following methods of the `event` object to control what happens next:

<Definitions>

- <Code>event.waitUntil(promise<ParamType>Promise</ParamType>)</Code> <Type>void</Type>

    - Extend the lifetime of the event without blocking the `response` from being sent. Use this method to notify the runtime to wait for tasks (e.g. logging, analytics to third-party services, streaming and caching) that need to run longer than the usual time it takes to send a response.

</Definitions>