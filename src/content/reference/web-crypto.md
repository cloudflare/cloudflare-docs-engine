---
weight: 7
---

# Web Crypto
The Web Crypto API provides a set of low-level functions for common cryptographic tasks. The Workers Runtime implements the full surface of this API, but with some differences in the [supported algorithms](#supported-algorithms) compared to those implemented in most browsers. This API is commonly used for [signing requests](/reference/write-workers/best-practices/signing-requests)

## Functions

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

1. <a name="footnote-1"></a> MD5 is not part of the WebCrypto standard, but is supported in Cloudflare Workers for interacting with legacy systems that require MD5. MD5 is considered a weak algorithm. **Do not rely upon MD5 for security.**
