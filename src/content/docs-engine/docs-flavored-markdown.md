---
order: 0
---

# Docs-flavored Markdown

> {warning} __Warning:__ These APIs are a work in progress, and may change substantially before release.

The Cloudflare Docs engine uses its own custom MDX/Markdown parsing to generate consistent and manageable markup, while offering flexibility to content authors.

--------------------------------

## Links

For links that you want to display as regular paragraph-style text links, use the regular Markdown syntax `[link text](url)`.

<div class="DocsMarkdown--example">

Visit [example.com](https://example.com).

</div>

```markdown
Visit [example.com](https://example.com).

View the [Tutorials](/tutorials) tutorials.

Learn how [V8:Isolates power Workers](/how-workers-works#isolates).
```

- __Internal links__ will use the [Gatsby’s `<Link/>` component](https://www.gatsbyjs.org/docs/gatsby-link/), which means they will be routed through `@reach/router` using `pushState`.
- __External links__ (matching `/^https?:/`) and __hash links__ (`.indexOf("#") === 0`), will be rendered as regular `<a/>` elements.

If you need to take advantage of Gatsby’s routing but you want control over the presentation of the link yourself, you can use `<Link/>` directly.

```markdown
<Link to="/examples" className="Button Button-is-secondary">
  View examples
</Link>
```

<div class="DocsMarkdown--example">
<Link to="/examples" className="Button Button-is-secondary">
  View examples
</Link>
</div>

--------------------------------

## Blockquotes

Use blockquotes when quoting someone. For example, here’s a translation of a quote commonly attributed to Antoine de Saint-Exupéry:

> A goal without a plan is just a wish.

```markdown
> A goal without a plan is just a wish.
```

> If you want to get fancy with it you can use
> [links](https://example.com) and `<code/>`, and
> really just about any another inline markdown.
>
> Multiple paragraphs can be added as well. And of
> course you can use **bold** or _italics_. And
> don’t forget to `<cite/>`.
>
> <cite>Adam Schwartz</cite>

```markdown
> If you want to get fancy with it you can use
> [links](https://example.com) and `<code/>`, and
> really just about any another inline markdown.
>
> Multiple paragraphs can be added as well. And of
> course you can use **bold** or _italics_. And
> don’t forget to `<cite/>`.
>
> <cite>Adam Schwartz</cite>
```

--------------------------------

## Custom blocks

Custom blocks are useful for displaying a “Note” or “Warning”. To use one, simply use a standard Markdown blockquote, but prefix it with additional blockquote line containing either `{note}` or `{warning}`.

> {note}
> __Note:__ This is a note.

> {warning}
> __Warning__
>
> This is a warning.


```markdown
> {note}
> __Note:__ This is a note.

> {warning}
> __Warning__
> This is a warning.

```

You can use whatever text you want inside the custom block, so for example, a `{note}` block could instead be used as a tip:

> {note}
> **Did you know?** you can use a _any Markdown you want_ inside of a custom block?

```markdown
> {note}
> **Did you know?** you can use a _any Markdown you want_ inside of a custom block?
```

--------------------------------

## Code blocks

Code blocks are implemented on top of [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer), with a few customizations.

Custom presentation options like [row highlights](#highlight) and [filename headers](#filenames) can be added by writing frontmatter inside the code fences (\`\`\`).

### Highlight

You can highlight rows by specifying `highlight: [...]` with an array of row numbers.

For example, here we’re specifying `highlight: [5,6,7]` in order to highlight the `hello()` function:

```js
---
highlight: [5,6,7]
---
async function lazy() {
  // TODO: implement
}

function hello() {
  Math.random() > .5 ? "Hello" : "Bonjour"
}

const ITEMS = 12345
for (let i = 0; i <= ITEMS; i += 1) {
  console.log(`${ hello() } world!`)
}
```

Here’s what that example looks like in Markdown... with the relevant row highlighted. ;)

``````txt
---
highlight: [3]
---
```
---
highlight: [5,6,7]
---
async function lazy() {
  // TODO: implement
}

function hello() {
  Math.random() > .5 ? "Hello" : "Bonjour"
}

const ITEMS = 12345
for (let i = 0; i <= ITEMS; i += 1) {
  console.log(`${ hello() } world!`)
}
```
``````

### Filenames

Filenames are applied by setting `filename: ______` in the code frontmatter.

```js
---
filename: hello-worker.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(`Hello worker!`, { status: 200 })
}
```

Here’s what that example looks like in Markdown... with the relevant row highlighted. ;)

``````txt
---
highlight: [3]
---
```
---
filename: hello-worker.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(`Hello worker!`, { status: 200 })
}
```
``````

### Headers

Header content other than [filenames](#filenames) can be specyfied with `header: ______`.

```sh
---
header: Install the Workers CLI
---
npm install -g @cloudflare/workers-cli
```

```sh
---
header: Configure the Workers CLI
---
workers config
```

### Workers-JavaScript

Syntax highlighting in the Workers docs is implemented on top of [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer), with custom

On top of regular JavaScript, Workers-specific APIs are automatically detected and rendered in true Cloudflare spirit—in [orange](https://cloudflare.com).

```js
const instance = new RegularClass()

const rewriter = new HTMLRewriter()
```

### Terminals

> {warning}
> __Warning__: The API for custom terminal displays is currently in flux.

Custom syntax highlighting for terminal code and output, similar to what’s currently on [workers.cloudflare.com](http://workers.cloudflare.com) and [workers.cloudflare.com/sites](http://workers.cloudflare.com/sites), is in active development.

<pre class="CodeBlock CodeBlock-scrolls-horizontally" language="sh"><code><u><b class="CodeBlock--token-comment"># Install Wrangler, and tell it who you are</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>npm install -g @cloudflare/wrangler<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler config<br/><u><br/><b class="CodeBlock--token-comment"># Create and publish a “Hello World” Worker</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler generate hello<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>cd hello<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler subdomain world<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler publish<u><br/><b class="CodeBlock--token-success">Published</b><b class="CodeBlock--token-success"> </b><b class="CodeBlock--token-value">https://hello.world.workers.dev</b></u></code></pre>

For now, please simply use standard Markdown code fences (\`\`\`) with `sh`.

```sh
npm install -g @cloudflare/wrangler
wrangler config
```

### Examples

Check out the dedicated [code block examples](/docs-engine/code-block-examples) page for more.


--------------------------------

## Keyboard commands

When you want to display a keyboard command, use a `<kbd/>` element. For example:

<div class="DocsMarkdown--example">

Press <kbd>⌘</kbd> <kbd>F</kbd> (Command-F) to search for text within this document.

</div>

```markdown
Press <kbd>⌘</kbd> <kbd>F</kbd> (Command-F) to
search for text within this document.
```

--------------------------------

## Details and summary

> {warning} __Warning:__ This API is in active developement. Please don’t use until this notice is removed.

There may be times when you want to provide additional information in context, but without clouding up the neighboring content for the “80% case”. For that you can use `<details/>` and `<summary/>`.

<details>
<summary>Details</summary>
<p>Something small enough to escape casual notice.</p>
</details>

<details>
<summary>Details</summary>
<p>Something small enough to escape casual notice.</p>
</details>

<details>
<summary>Details</summary>
<p>Something small enough to escape casual notice.</p>
</details>
