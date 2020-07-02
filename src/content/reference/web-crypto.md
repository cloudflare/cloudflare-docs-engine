---
weight: 7
---

# Web Crypto

## Background

The Web Crypto API provides a set of low-level functions for common cryptographic tasks. The Workers Runtime implements the full surface of this API, but with some differences in the [supported algorithms](#supported-algorithms) compared to those implemented in most browsers. This API is commonly used for [signing requests](/reference/write-workers/best-practices/signing-requests)

The `Class` class is used whenever you’re trying to create an instance. It’s particularly useful when you’re trying to create multiple instances. Here are some common uses:

- [Tutorial which uses Class](#)
- [Example which uses Class](#)
- [Another example which uses Class](#)
  
--------------------------------

## Constructor

```js
const instance = new Class()
```

### Properties

<Definitions>

- `instance.title` <Type>string</Type> <PropMeta>read-only</PropMeta>

  - The title of the instance

- `instance.visible` <Type>boolean</Type> <PropMeta>read-only</PropMeta>

  - Boolean indicating if the instance is visible

</Definitions>

### Methods

<Definitions>

- <Code>setTitle(newTitle<ParamType>string</ParamType>)</Code>

  - Sets the title to `newTitle`.

- <Code>hide()</Code> <Type>boolean</Type>

  - Attempts to hide the instance. Returns a boolean whether hiding was successful.

</Definitions>

--------------------------------

## Common issues

Sometimes you’ll find that when you create instances of `Class`, unexpected things happen. It’s important to remember that you can always [debug your `Class`](#learning-page-about-debugging).

--------------------------------

## See also

- [`RelatedClass`](#)
- [`OtherRelatedClass`](#)
- [An external link to relevant documentation, e.g. on MDN](https://example.com)
- [A page about writing JS in general](#)

--------------------------------

<Definitions>

- `crypto.getRandomValues()`

  - Fills the passed [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) with cryptographically sound random values. Learn more [`here`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues).

</Definitions>

## SubtleCrypto

Accessible from `crypto.subtle`.

### Methods

Implements the full API described [here](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods).

### Supported Algorithms

Cloudflare implements a subset of the most common crytographic algorithms, as shown in the following table.
We are happy to add support for more algorithms – [let us know](https://community.cloudflare.com/c/developers/workers).

| Algorithm         | sign()<br/>verify() | encrypt()<br/>decrypt() | digest() | deriveBits()<br/>deriveKey() | generateKey() | wrapKey()<br/>unwrapKey() |
| :---------------- | :------------------ | :---------------------- | :------- | :--------------------------- | :------------ | :------------------------ |
| RSASSA-PKCS1-v1_5 | ✓                   |                         |          |                              |               |                           |
| ECDSA             | ✓                   |                         |          |                              |               |                           |
| HMAC              | ✓                   |                         |          |                              | ✓             |                           |
| AES-CBC           |                     | ✓                       |          |                              |               | ✓                         |
| AES-GCM           |                     | ✓                       |          |                              | ✓             | ✓                         |
| SHA-1             |                     |                         | ✓        |                              |               |                           |
| SHA-256           |                     |                         | ✓        |                              |               |                           |
| SHA-384           |                     |                         | ✓        |                              |               |                           |
| SHA-512           |                     |                         | ✓        |                              |               |                           |
| MD5<sup><a href="#footnote-1">1</a></sup>           |                     |                         | ✓        |                              |               |                           |
| PBKDF2            |                     |                         |          | ✓                            |               |                           |

__Footnotes:__

1. <a name="footnote-1"></a> MD5 is not part of the WebCrypto standard, but is supported in Cloudflare Workers for interacting with legacy systems that require MD5. MD5 is considered a weak algorithm. Do not rely upon MD5 for security.
