---
title: Encoding
weight: 6
---

## TextEncoder

The TextEncoder takes a stream of code points as input and emits a stream of bytes. Encoding types passed to the constructor are ignored and a UTF-8 TextEncoder is created.

### Constructor

[`TextEncoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder) returns a newly constructed `TextEncoder` that generates a byte stream with UTF-8 encoding. `TextEncoder` takes no parameters and throws no exceptions.

### Properties

[`encoding`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encoding) (Read only) this [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) contains the name of the encoder as a string describing the method the `TextEncoder` uses (always `utf-8`).

### Methods

[`encode()`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode) takes a [`USVString`](https://developer.mozilla.org/en-US/docs/Web/API/USVString) as input and returns a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Typed_arrays/Uint8Array) with UTF-8 encoded text.

## TextDecoder

The **TextDecoder** interface represents a UTF-8 decoder. Decoders take a stream of bytes as input and emit a stream of code points.

### Constructor

[`TextDecoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder) returns a newly constructed `TextDecoder` that generates a code-point stream.

### Properties

* [`encoding`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/encoding)(Read only) is a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) with the name of the decoder that describes the method the `TextDecoder` uses.

* `TextDecoder.fatal` (Read only) is a Boolean value to indicate if the error mode is fatal.

* `TextDecoder.ignoreBOM` (Read only) is a Boolean value to indicate if the byte-order marker is ignored.

### Methods

[`decode()`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode) returns a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) that contains the text decoded using the method specified in the `TextDecoder` object.
