---
title: 'KV'
weight: 5
---

- [Writing key-value pairs](#writing-key-value-pairs)
  * [Writing Data in Bulk](#writing-data-in-bulk)
  * [Expiring Keys](#expiring-keys)
    + [Creating expiring keys](#creating-expiring-keys)
- [Reading key-value pairs](#reading-key-value-pairs)
  * [Types](#types)
- [Deleting key-value pairs](#deleting-key-value-pairs)
- [Listing keys](#listing-keys)
  * [More detail](#more-detail)
  * [Listing by prefix](#listing-by-prefix)
  * [Ordering](#ordering)
  * [Pagination](#pagination)

# Writing key-value pairs

To create a new key-value pair, or to update the value for a particular key,
you can call the `put` method on any namespace you've bound to your script.
The basic form of this method looks like this:

`await NAMESPACE.put(key, value)`

The type is automatically inferred from value, and can be any of:

- `string`
- `ReadableStream`
- `ArrayBuffer`

This method returns a promise that you should `await` on in order to verify
a successful update.

You can also [write key-value pairs from the command line with
Wrangler](/tooling/wrangler/kv_commands/#kv-key).

Finally, you can [write data via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).

Due to the eventually consistent nature of Workers KV, it's a common pattern
to write data via Wrangler or the API, but read the data from within a worker.

## Writing Data in Bulk

You can [write more than one key-value pair at a time with
wrangler](/tooling/wrangler/kv_commands/#kv-bulk) or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-multiple-key-value-pairs), up to 10,000 KV pairs. A `key` and `value` are required for each KV pair. The entire request size must be less than 100 megabytes.
We do not support this from within a Worker script at this time.

## Expiring Keys

Many common uses of Workers KV involve writing keys that are only meant to be
valid for a certain amount of time. Rather than requiring applications to
remember to delete such data at the appropriate time, Workers KV offers the
ability to create keys that automatically expire, either at a particular
point in time or after a certain amount of time has passed since the key was
last modified.

The core behavior of an expiring key is that once its expiration time has
been reached, attempts to read it will behave as if the key does not exist.
Attempting to get the key's value will return a promise that resolves to null
in a Worker or a 404 HTTP response via the API, and listing keys using the
API will omit any expired keys from the response.

You can choose one of two ways to specify when a key should expire:

- Set its "expiration", using an absolute time specified in a number of
  [seconds since the UNIX epoch](https://en.wikipedia.org/wiki/Unix_time). For
  example, if you wanted a key to expire at 12:00AM UTC on April 1, 2019, you
  would set the key's expiration to 1554076800.
- Set its "expiration TTL" (time to live), using a relative number of seconds
  from the current time. For example, if you wanted a key to expire 10 minutes
  after creating it, you would set its expiration TTL to 600.

Both of these options are usable when writing a key inside a Worker or when
writing keys using the API.

Note that expiration times of less than 60 seconds in the future or
expiration TTLs of less than 60 seconds are not supported at this time.

### Creating expiring keys

We talked about the basic form of the `put` method above, but this call also
has an optional third parameter. It accepts an object with optional fields
that allow you to customize the behavior of the `put`. In particular, you can
set either `expiration` or `expirationTtl`, depending on how you would like
to specify the key's expiration time. In other words, you'd run one of the
two commands below to set an expiration when writing a key from within a
Worker:

`NAMESPACE.put(key, value, {expiration: secondsSinceEpoch})`

`NAMESPACE.put(key, value, {expirationTtl: secondsFromNow})`

These assume that `secondsSinceEpoch` and `secondsFromNow` are variables
defined elsewhere in your Worker code.

You can also [write with an expiration on the command line via
Wrangler](/tooling/wrangler/kv_commands/#kv-key) or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).

# Reading key-value pairs

To get the value for a given key, you can call the `get` method on any
namespace you've bound to your script:

`NAMESPACE.get(key)`

The method returns a promise you can `await` to get the value. If the key
is not found, the promise will resolve with the literal value `null`.

Here's an example of reading a key from within a Worker:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await FIRST_KV_NAMESPACE.get("first-key")
  if (value === null) {
    return new Response("Value not found", {status: 404})
  }

  return new Response(value)
}
```

You can also [read key-value pairs from the command line with
wrangler](/tooling/wrangler/kv_commands/#kv-key).

Finally, you can also [read from the
API](https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair).

## Types

You can pass an optional `type` parameter to the `get` method as well:

`NAMESPACE.get(key, type)`

The `type` parameter can be any of:

- `"text"`: (default) a string
- `"json"`: an object decoded from a JSON string
- `"arrayBuffer"`: An [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instance.
- `"stream"`: A [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

For simple values it often makes sense to use the default `"text"` type which
provides you with your value as a string. For convenience a `"json"` type is
also specified which will convert a JSON value into an object before
returning it to you. For large values you can request a `ReadableStream`, and
for binary values an `ArrayBuffer`.

For large values, the choice of `type` can have a noticeable effect on latency
and CPU usage. For reference, the `type`s can be ordered from fastest to slowest
as `"stream"`, `"arrayBuffer"`, `"text"`, and `"json"`.

# Deleting key-value pairs

To delete a key-value pair, you can call the `delete` method on any
namespace you've bound to your script:

`await NAMESPACE.delete(key)`

This will remove the key and value from your namespace. As with any
operations, it may take some time to see that they key has been deleted from
various points at the edge.

This method returns a promise that you should `await` on in order to verify
successful deletion.

You can also [delete key-value pairs from the command line with
Wrangler](/tooling/wrangler/kv_commands/#kv-key)
or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair).

# Listing keys

You can use a list operation to see all of the keys that live in a given
namespace. Here's a basic example:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list()

  return new Response(value.keys)
}
```

You can also [list keys on the command line with Wrangler](/tooling/wrangler/kv_commands/#kv-key) or [via the API](https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys).

## More detail

The `list` method has this signature (in TypeScript):

`NAMESPACE.list({prefix?: string, limit?: number, cursor?: string})`

All arguments are optional:

* `prefix` is a string that represents a prefix you can use to filter all keys.
* `limit` is the maximum number of keys returned. The default is 1000, which is
  the maximum. It is unlikely that you will want to change this default, but
  it is included for completeness.
* `cursor` is a string used for paginating responses. See below for more.

The `.list` method returns a promise which resolves with an object that looks
like this:

```json
{
  keys: [{ name: "foo", expiration: 1234}],
  list_complete: false,
  cursor: "6Ck1la0VxJ0djhidm1MdX2FyD"
}
```

The `keys` property will contain an array of objects describing each key.
That object will have two keys of its own: a `name` of the key, and its
expiration value. The name is a string, and the expiration value is a number.
The expiration value will only be returned if the key has an expiration, and
will be in the absolute value form, even if it was set in the TTL form.

Additionally, if `list_complete` is `false`, there are more keys to fetch.
You'll use the `cursor` property to get more keys. See the [Pagination section](#pagination)

below for more details.

## Listing by prefix

You can also list all of the keys starting with a particular prefix. For
example, say you've structured your keys with a user, a user id, and then
some key names, separated by colons (e.g. ` user:1:<key>`). You could get the keys for user number
one by doing this:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list({"prefix": "user:1:"})

  return new Response(value.keys)
}
```

This will return all of the keys that start with `"user:1:"`.

## Ordering

Keys are always returned in lexicographically sorted order according to their UTF-8 bytes.

## Pagination

If you have more keys than the `limit` value, only that many will be returned. Additionally, the
`list_complete` key will be set to `false`, and a `cursor` will also be returned. In this case,
you can call `list` again with the `cursor` value to get the next set of keys:

```js
const value = await NAMESPACE.list()

const cursor = value.cursor

const next_value = await NAMESPACE.list({"cursor": cursor})
```
