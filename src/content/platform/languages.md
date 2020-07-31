# Languages

## Background

Workers is a polyglot platform. You can likely write code on Workers with a language you already know. We originally built Workers to operate on JavaScript and WASM and over time we’ve added support for new languages. We are excited to support and deepen integrations with popular languages like Python for Workers.

## JavaScript / TypeScript

JavaScript is fully supported on the Workers platform. We recommend using JS. You can also use TypeScript on the platform and can find the [type definitions here](https://github.com/cloudflare/workers-types).

<TableWrap>

| Language   | Example project                                                                                                         |
|------------|-------------------------------------------------------------------------------------------------------------------------|
| JavaScript | [cloudflare/worker-template](https://github.com/cloudflare/worker-template)                                             |
| TypeScript | [EverlastingBugstopper/worker-typescript-template](https://github.com/EverlastingBugstopper/worker-typescript-template) |

</TableWrap>

### See Also

- [TypeScript Type Definitions](https://github.com/cloudflare/workers-types)
- [Hello World for Workers in JS](https://github.com/cloudflare/worker-template)
- [Javascript and Webstandard APIs](/reference/runtime-apis/web-standards)
- [Starters - Code snippets](/starters)
- [Tutorials](/tutorials)

## WASM-supported

WebAssembly — often abbreviated as “WASM” — is a technology that extends the web platform to support compiled languages like C, C++, Rust, and more. Since these languages can be compiled to a special WASM binary format and then loaded in a browser, you can use them on the Workers platform!  Learn more by checking out the example projects.

<TableWrap>

| Language | Example project                                                                                   |
|----------|---------------------------------------------------------------------------------------------------|
| Rust     | [cloudflare/rustwasm-worker-template](https://github.com/cloudflare/rustwasm-worker-template)     |
| C        | [cloudflare/worker-emscripten-template](https://github.com/cloudflare/worker-emscripten-template) |
| Cobol    | [cloudflare/cobol-worker-template](https://github.com/cloudflare/cobol-worker-template)           |

</TableWrap>

### See Also

- [Serverless Rust with Cloudflare Workers](https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/)
- [WebAssembly on Cloudflare Workers](https://blog.cloudflare.com/webassembly-on-cloudflare-workers/)

## Compiled to JavaScript

Since Workers runs off of JS, you can also program on Workers with any language than can compile down to JS including the languages below. Learn more by checking out the example projects.

<TableWrap>

| Language     | Example project                                                                                 |
|--------------|-------------------------------------------------------------------------------------------------|
| Kotlin       | [cloudflare/kotlin-worker-hello-world](https://github.com/cloudflare/kotlin-worker-hello-world) |
| Dart         | [cloudflare/dart-worker-hello-world](https://github.com/cloudflare/dart-worker-hello-world)     |
| Python       | [cloudflare/python-worker-hello-world](https://github.com/cloudflare/python-worker-hello-world) |
| Scala        | [cloudflare/scala-worker-hello-world](https://github.com/cloudflare/scala-worker-hello-world)   |
| Reason/OCaml | [cloudflare/reason-worker-hello-world](https://github.com/cloudflare/reason-worker-hello-world) |

</TableWrap>

### See Also

- [Cloudflare Workers announces broad language support](https://blog.cloudflare.com/cloudflare-workers-announces-broad-language-support/)
