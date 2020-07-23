import NetworkMap from "../../components/network-map"

# How Workers works

Though Cloudflare Workers behave similar to JavaScript in the browser or in Node.js, there are a few subtle differences in how you have to think about your code. Under the hood, the Workers runtime uses the [V8 engine](https://v8.dev/)—the same engine used by Chromium and Node.js. The Workers runtime also implements many of the standard [APIs](/reference/runtime-apis/web-standards) available in most modern browsers.

The differences between JavaScript written for the browser or Node.js happen at runtime. Rather than running on an individual's machine (e.g a browser application or on a centralized server), Workers functions run on [Cloudflare's Edge Network](https://www.cloudflare.com/network/)—a growing global network of thousands of machines distributed across hundreds of locations.

<figure><NetworkMap/></figure>

<!-- TODO: ... -->
