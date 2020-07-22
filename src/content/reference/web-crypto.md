# Web Crypto API

## Background

The Web Crypto API provides a set of low-level functions for common cryptographic tasks. The Workers
Runtime implements the full surface of this API, but with some differences in the [supported
algorithms](#supported-algorithms) compared to those implemented in most browsers.

Performing cryptographic operations using the Web Crypto API is significantly faster than performing
them purely in JavaScript. If you want to perform CPU-intensive cryptographic operations, you should
consider using the Web Crypto API.

The Web Crypto API is implemented through the `SubtleCrypto` interface, accessible via the global
`crypto.subtle` binding. A simple example of calculating a digest (also known as a hash) is:

```javascript
const myText = new TextEncoder().encode('Hello world!')

const myDigest = await crypto.subtle.digest(
  {
    name: 'SHA-256',
  },
  myText, // The data you want to hash as an ArrayBuffer
)

console.log(new Uint8Array(myDigest))
```

<!-- TODO: Update links to relevant Examples. -->
Some common uses include:

- [Signing requests.](/reference/write-workers/best-practices/signing-requests)

<Aside type="warning" header="Warning">

The Web Crypto API differs significantly from Node's Crypto API. If you want to port JavaScript
that relies on Node's Crypto API, you'll need to invest in translating it to use Web Crypto
primitives.

</Aside>

## Methods

<Definitions>

- <Code>crypto.getRandomValues(buffer<ParamType>ArrayBuffer</ParamType>)</Code>
  <Type>Promise&lt;ArrayBuffer></Type>

  - Fills the passed ArrayBuffer with cryptographically sound random values.

</Definitions>

### SubtleCrypto Methods

These methods are all accessed via `crypto.subtle`, which is also [documented in detail on
MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods).

<Definitions>

- <Code>encrypt(algorithm<ParamType>object</ParamType>, key<ParamType>CryptoKey</ParamType>,
  data<ParamType>BufferSource</ParamType>)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fufills with the encrypted data corresponding to the clear text,
    algorithm, and key given as parameters.

- <Code>decrypt(algorithm<ParamType>object</ParamType>, key<ParamType>CryptoKey</ParamType>,
  data<ParamType>BufferSource</ParamType>)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with the clear data corresponding to the ciphertext, algorithm,
    and key given as parameters.

- <Code>sign(algorithm<ParamType>string | object</ParamType>, key<ParamType>CryptoKey</ParamType>,
  data<ParamType>ArrayBuffer</ParamType>)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with the signature corresponding to the text, algorithm, and key
    given as parameters.

- <Code>verify(algorithm<ParamType>string | object</ParamType>, key<ParamType>CryptoKey</ParamType>,
  signature<ParamType>ArrayBuffer</ParamType>, data<ParamType>ArrayBuffer</ParamType>)</Code>
  <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with a Boolean value indicating if the signature given as a
    parameter matches the text, algorithm, and key that are also given as parameters.

- <Code>digest(algorithm<ParamType>string | object</ParamType>,
  data<ParamType>ArrayBuffer</ParamType>)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with a digest generated from the algorithm and text given as
    parameters.

- <Code>generateKey(algorithm<ParamType>object</ParamType>, extractable<ParamType>bool</ParamType>,
  keyUsages<ParamType>Array</ParamType>)</Code> <Type>Promise&lt;CryptoKey> |
  Promise&lt;CryptoKeyPair></Type>

  - Returns a Promise that fulfills with a newly-generated `CryptoKey`, for symmetrical algorithms,
    or a `CryptoKeyPair`, containing two newly generated keys, for asymmetrical algorithms. For
    example, to generate a new AES-GCM key:

    ```javascript
    let keyPair = crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: "256"
      },
      true,
      ["encrypt", "decrypt"]
    );
    ```

- <Code>deriveKey(algorithm<ParamType>object</ParamType>, baseKey<ParamType>CryptoKey</ParamType>,
  derivedKeyAlgorithm<ParamType>object</ParamType>, extractable<ParamType>bool</ParamType>,
  keyUsages<ParamType>Array</ParamType>)</Code> <Type>Promise&lt;CryptoKey></Type>

  - Returns a Promise that fulfills with a newly generated `CryptoKey` derived from the master key
    and specific algorithm given as parameters.

- <Code>deriveBits(algorithm<ParamType>object</ParamType>, baseKey<ParamType>CryptoKey</ParamType>,
  length<ParamType>int</ParamType>)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with a newly generated buffer of pseudo-random bits derived from
    the master key and specific algorithm given as parameters. It takes as its arguments the base
    key, the derivation algorithm to use, and the length of the bit string to derive. It returns a
    Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This method
    is very similar to `deriveKey()`, except that `deriveKey()` returns a `CryptoKey` object rather
    than an `ArrayBuffer`. Essentially, `deriveKey()` is composed of `deriveBits()` followed by
    `importKey()`.

- <Code>importKey(format<ParamType>string</ParamType>, keyData<ParamType>ArrayBuffer</ParamType>,
  algorithm<ParamType>object</ParamType>, extractable<ParamType>bool</ParamType>,
  keyUsages<ParamType>Array</ParamType>)</Code> <Type>Promise&lt;CryptoKey></Type>

  - Transform a key from some external, portable format into a `CryptoKey` for use with the Web
    Crypto API.

- <Code>exportKey(format<ParamType>string</ParamType>, key<ParamType>CryptoKey</ParamType>)</Code>
  <Type>Promise&lt;ArrayBuffer></Type>

  - Transform a `CryptoKey` into a portable format, if the `CryptoKey` is `extractable`.

- <Code>wrapKey(format<ParamType>string</ParamType>, key<ParamType>CryptoKey</ParamType>,
  wrappingKey<ParamType>CryptoKey</ParamType>, wrapAlgo<ParamType>object</ParamType>)</Code>
  <Type>Promise&lt;ArrayBuffer></Type>

  - Transform a `CryptoKey` into a portable format, and then encrypt it with another key. This
    renders the `CryptoKey` suitable for storage or transmission in untrusted environments.

- <Code>unwrapKey(format<ParamType>string</ParamType>, key<ParamType>CryptoKey</ParamType>,
  unwrappingKey<ParamType>CryptoKey</ParamType>, unwrapAlgo<ParamType>object</ParamType>,
  unwrappedKeyAlgo<ParamType>object</ParamType>, extractable<ParamType>bool</ParamType>,
  keyUsages<ParamType>Array</ParamType>)</Code> <Type>Promise&lt;CryptoKey></Type>

  - Transform a key that was wrapped by `wrapKey()` back into a `CryptoKey`.

</Definitions>

### Supported algorithms

Workers implements a subset of the most common cryptographic algorithms, as shown in the following table.
We are happy to add support for more algorithms – [let us know about your use case](https://community.cloudflare.com/c/developers/workers).

| Algorithm                                 | sign()<br/>verify() | encrypt()<br/>decrypt() | digest() | deriveBits()<br/>deriveKey() | generateKey() | wrapKey()<br/>unwrapKey() |
| :---------------------------------------- | :------------------ | :---------------------- | :------- | :--------------------------- | :------------ | :------------------------ |
| RSASSA-PKCS1-v1_5                         | ✓                   |                         |          |                              |               |                           |
| ECDSA                                     | ✓                   |                         |          |                              |               |                           |
| HMAC                                      | ✓                   |                         |          |                              | ✓             |                           |
| AES-CBC                                   |                     | ✓                       |          |                              |               | ✓                         |
| AES-GCM                                   |                     | ✓                       |          |                              | ✓             | ✓                         |
| SHA-1                                     |                     |                         | ✓        |                              |               |                           |
| SHA-256                                   |                     |                         | ✓        |                              |               |                           |
| SHA-384                                   |                     |                         | ✓        |                              |               |                           |
| SHA-512                                   |                     |                         | ✓        |                              |               |                           |
| MD5<sup><a href="#footnote-1">1</a></sup> |                     |                         | ✓        |                              |               |                           |
| PBKDF2                                    |                     |                         |          | ✓                            |               |                           |

__Footnotes:__

1. <a name="footnote-1"></a> MD5 is not part of the WebCrypto standard, but is supported in
   Cloudflare Workers for interacting with legacy systems that require MD5. MD5 is considered a weak
   algorithm. Do not rely upon MD5 for security.

--------------------------------

<!--
## Common issues

We should fill this in.

--------------------------------
-->

## See also

- [SubtleCrypto documentation on
  MDN.](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
- [SubtleCrypto documentation as part of the W3C Web Crypto API
  specification.](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface)
