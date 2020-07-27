---
type: f
---

# Languages

Workers is a polyglot platform. You can likely write code on Workers with a language you already know.

## Support Status

<Definitions>

- `Unsupported 🚫`
  - This language is not supported yet due to technical limitations or a lack of tooling.

- `Experimental Support ℹ️`
  - This language has a supported Hello World template and does not support every Workers feature.

- `Partial Support 🟡`
  - This language has a supported fetch and Hello World template, a SDK, and documentation.

- `Full Support ✅`
  - This language has a worker site template, full sdk, full documentation, and a code maintainer. 

</Definitions>

<TableWrap>

| Language     | Format | Support | Tooling                                                                        | SDK                                              | Docs | Hello World | Fetch Template | Sites | Fetch | Cache | KV | HTML Rewriter |
|--------------|--------|---------|--------------------------------------------------------------------------------|--------------------------------------------------|------|-------------|----------------|-------|-------|-------|----|---------------|
| JavaScript   | JS     | ✅       | [webpack](https://webpack.js.org/)                                             | ✅                                                | ✅    | ✅           | ✅              | ✅     | ✅     | ✅     | ✅  | ✅             |
| TypeScript   | JS     | ✅       | [TypeScript](https://github.com/microsoft/TypeScript)                          | ✅ <sub><a href="https://github.com/cloudflare/workers-types">*</a></sub> | 🚫   | ✅           | 🚫             | 🚫    | ✅     | ✅     | ✅  | ✅             |
| Rust         | WASM   | 🟡      | [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen)                       | 🟡                                               | 🚫   | ✅           | 🚫             | 🚫    | ✅     | 🚫    | 🚫 | 🚫            |
| C            | WASM   | ℹ️      | [emscripten](https://emscripten.org/)                                          | 🚫                                               | 🚫   | ✅           | 🚫             | 🚫    | ✅     | 🚫    | 🚫 | 🚫            |
| Cobol        | WASM   | ℹ️      | [cobaul](https://github.com/cloudflare/cobaul)                                 | 🚫                                               | 🚫   | ✅           | 🚫             | 🚫    | 🚫    | 🚫    | 🚫 | 🚫            |
| Kotlin       |        |         | [gradle/intellij](https://kotlinlang.org/docs/reference/js-project-setup.html) |                                                  |      | ✅           |                |       |       |       |    |               |
| Dart         |        |         | [dart2js](https://dart.dev/tools/dart2js)                                      |                                                  |      | ✅           |                |       |       |       |    |               |
| Python       |        |         | [Transcrypt](http://www.transcrypt.org/)                                       |                                                  |      | ✅           |                |       |       |       |    |               |
| Scala        |        |         | [Scala.js](https://www.scala-js.org/)                                          |                                                  |      | ✅           |                |       |       |       |    |               |
| Reason/OCaml |        |         | [Bucklescript](https://bucklescript.github.io/)                                |                                                  |      | ✅           |                |       |       |       |    |               |


</TableWrap>