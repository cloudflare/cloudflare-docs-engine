
# Languages

## Background

Workers is a polyglot platform. You can likely write code on Workers with a language you already know. We originally built Workers to use JS/TS and over time we've added support for new languages. We plan to add popular languages like Python and continue to deepen support for added languages.

## Javascript

Javascript is fully supported on the Workers platform. We recommend using JS.

### See Also:
- [`Hello World for Workers in JS`](https://github.com/cloudflare/worker-template)
- [`Javascript and Webstandard APIs`](/reference/runtime-apis/web-standards)
- [`Starters - Code snippets`](/starters)
- [`Tutorials`](/tutorials)

## WASM-supported

WebAssembly -- often abbreviated as "WASM" -- is a technology that extends the web platform to support compiled languages like C, C++, Rust, Go, and more. Since these languages can be compiled to a special WASM binary format and then loaded in a browser, you can use them on the Workers platform!  Learn more by checking out the example projects.

<TableWrap>

| Language     | Example Project |
|--------------|--------|
| Rust         | https://github.com/cloudflare/rustwasm-worker-template   |
| C            | https://github.com/cloudflare/worker-emscripten-template   |
| Cobol        | https://github.com/cloudflare/cobol-worker-template   |

</TableWrap>

### See Also:
- [`Serverless Rust with Cloudflare Workers`](https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/)
- [`WebAssembly on Cloudflare Workers`](https://blog.cloudflare.com/webassembly-on-cloudflare-workers/)

## Compiled to JavaScript

Since Workers runs off of JS, you can also program on Workers with any language than can compile down to JS including the languages below. Learn more by checking out the example projects.

<TableWrap>

| Language     | Example Project | 
|--------------|--------|
| TypeScript   |   https://github.com/EverlastingBugstopper/worker-typescript-template     |
| Kotlin       |    https://github.com/cloudflare/kotlin-worker-hello-world    |
| Dart         |    https://github.com/cloudflare/dart-worker-hello-world    |
| Python       |    https://github.com/cloudflare/python-worker-hello-world    |
| Scala        |     https://github.com/cloudflare/scala-worker-hello-world   |
| Reason/OCaml |    https://github.com/cloudflare/reason-worker-hello-world    |

</TableWrap>

### See Also:
- [`Cloudflare Workers Announces Broad Language Support`](https://blog.cloudflare.com/cloudflare-workers-announces-broad-language-support/)