---
order: 0
---

# Docs-flavored Markdown

<Aside type="warning">

__Warning:__ These APIs are a work in progress, and may change substantially before release.

</Aside>

The Cloudflare Docs engine uses its own custom MDX/Markdown parsing to generate consistent and manageable markup, while offering flexibility to content authors.

--------------------------------

## Frontmatter

There are a number of optional frontmatter properties you can set that the Cloudflare Docs engine is aware of. However, it is the goal of the docs engine that the default behavior (when not setting them) works well out of the box.

```txt
frontmatter {
  title
  type
  order
  hidden
  hideChildren
  breadcrumbs
}
```

### Title

By default the title used in the sidebar and for the document title will automatically be generated from the page’s `h1` (set with `# Title` in Markdown.

If you would like to use a different title in these places—for example, if you want to use a shortened title in the sidebar for space reasons—you may do so by setting the optional `title` frontmatter property, and it will override the `h1`.

### Type

All pages you write will by default have the `"document"` type. This is used mainly by the layout engine to determine if the page needs a sidebar and should have a table of contents automatically generated.

<Aside>

__Note:__ A planned feature will allow content authors to disable the table of contents.

</Aside>

<Aside>

__Note:__ A planned feature will allow content authors to replace the table of contents with other content.

</Aside>

### Order

By default, all pages will be ordered in the sidebar alphabetically within their depth.

If you’d like to modify that order, set the `order` property to an intenger on any pages you’d like. Lower integers will display visually higher. It is recommended that you order them starting at `0`.

If you only set `order` on some of your pages, all of the additional pages will end up below it, sorted alphabetically. If you set more than one page to the same order, they will also be sorted alphabetically.

### Hidden and hideChildren

Setting the `hidden` property to `true` will hide the page from the sidebar.

Setting `hideChildren` to `true` will hide all children of a page from the sidebar. The Tutorials and Examples section of this site set this.

### Breadcrumbs

By default, all pages (not at the top level of nav tree) will have breadcrumbs generated. But stylistically, breadcrumbs are currently only shown on mobile.

<Aside>In the case of these docs, the relevant parent information is shown clearly in the sidebar. On mobile devices, the sidebar isn’t visible, so we show the breadcrumbs there. This is a design decision that we may revisit as we see the content develop.</Aside>

### Additional properties for tutorials

Tutorials additionally have three properties which are used to sort and display them inside the [Tutorials](/tutorials) overview page.

```txt
frontmatter {
  updated
  difficulty
  length
}
```

The `updated` property sets the updated date. This is currently used to sort the table.

Currently `difficulty` is only set to one of `"Beginner"`, `"Advanced"`, or `"Expert"`, but any short string value is fine.

The `length` property is meant to be an indication of how long it takes to complete the tutorial _relative to the others_. As such, it is currently set as a percentage 0–100, like `50%`. This is a design/API decision we will want to revisit.

--------------------------------

## Links

For links that you want to display as regular paragraph-style text links, use the regular Markdown syntax `[link text](url)`.

<Example>

Visit [example.com](https://example.com).

</Example>

```markdown
Visit [example.com](https://example.com).

View the [Tutorials](/tutorials) tutorials.

Learn how [V8:Isolates power Workers](/how-workers-works#isolates).
```

- __Internal links__ will use [Gatsby’s `<Link/>` component](https://www.gatsbyjs.org/docs/gatsby-link/), which means they will be routed through `@reach/router` using `pushState`.
- __External links__ (matching `/^https?:/`) and __hash links__ (`.indexOf("#") === 0`), will be rendered as regular `<a/>` elements.

If you need to take advantage of Gatsby’s routing but you want control over the presentation of the link yourself, you can use `<Link/>` directly.

```markdown
<Link to="/examples" className="Button Button-is-secondary">
  View examples
</Link>
```

<Example>
<Link to="/examples" className="Button Button-is-secondary">
  View examples
</Link>
</Example>

--------------------------------

## Images

Images are added by simply using the markdown syntax.

```markdown
![Wall of entropy](./wall-of-entropy.jpg)
```

![Wall of entropy](./wall-of-entropy.jpg)

--------------------------------

## Asides

Asides are used for displaying notes and warnings. They render as an `<aside/>` element with `aria-role="note"`. To use one, simply use the `<Aside/>` component.

<Aside>

__Note:__ This is a note.

</Aside>

```markdown
<Aside>

__Note:__ This is a note.

</Aside>
```

You can use any MDX inside the component.

By default, an `Aside` will be of type `"note"`, meaning it will show in the friendly color of blue. However, if you’d like to show a warning stylization, simply add `type="warning"`.

You can also optionally specify a `header`.

<Aside type="warning" header={(<strong>Warning</strong>)}>

This is a warning.

</Aside>

```markdown
<Aside type="warning" header={(<strong>Warning</strong>)}>

This is a warning.

</Aside>
```

--------------------------------

## Example (MDX component)

The `<Example/>` component is used to simply add a box around some content. This can be useful when simply trying to demonstrate something that could otherwise be mistaken as the explaination of the same thing.

<Example>

Here’s an example:

<Example>

This is an example _of an example_.

</Example>

</Example>

```markdown
<Example>

This is an example _of an example_.

</Example>
```

--------------------------------

## Definitions, Code, Type, ParamType

When writing reference documentation, there are four MDX components that you use `Definitions`, `Code`, `Type`, and `ParamType` in conjuction with eachother. All of these components are added to the global scope, so you do not need to import them.

<Aside>

__Note:__ You may also use `<Definitions/>` for definition lists that are not specifically for code (read: defining properties or methods), however depending on your use case, it may be more appropriate to simply use `<dl/>`, `<dt/>` and `<dd/>`.

</Aside>

Here are some self-exemplifying definitions:

<Definitions>

- `<Definitions/>` <Type>MDXComponent</Type>

  - This defines the boundary of the reference definitions.

- `<Code/>` <Type>MDXComponent</Type>

  - An alternative way of describing an inline code block (like you would with two backticks) that allows you to render `<ParamType/>` within it.

- `<Type/>` <Type>MDXComponent</Type>

  - Displays a type `MDXComponent`, meant to be optionally used after a code block.

- <Code>{"<"}ParamType<ParamType>{"{children}"}</ParamType>{"/>"}</Code> <Type>MDXComponent</Type>

  - How you describe the type of a param inside of code block.

</Definitions>

Here’s the code for this set of definitions.

```markdown
<Definitions>

- `<Definitions/>` <Type>MDXComponent</Type>

  - This defines the boundary of the reference definitions.

- `<Code/>` <Type>MDXComponent</Type>

  - An alternative way of describing an inline code block (like you would with two backticks) that allows you to render `<ParamType/>` within it.

- `<Type/>` <Type>MDXComponent</Type>

  - Displays a type `MDXComponent`, meant to be optionally used after a code block.

- <Code>{"<"}ParamType<ParamType>{"{children}"}</ParamType>{"/>"}</Code> <Type>MDXComponent</Type>

  - How you describe the type of a param inside of code block.

</Definitions>
```

Instructions for composing reference documention:

1. First wrap everything inside of `<Definitions>`. Note that MDX requires that you include a new line before and after each block-style MDX tag.

  ```markup
  ---
  highlight: [1,3]
  ---

  <Definitions>

  ...
  ```

2. Within the definitions block, include an unordered list, with the following structure:

    - Each term is specifid in an inline code element inside each list item.

      - For property definitions, you can use two backticks.

        ```markdown
          - `property`
            - ...
        ```

      - For method definitions in which you need to specify a param type inside the inline code block, use the `<Code/>` component with child `<ParamType/>` components.

        ```markdown
          - <Code>method(param<ParamType>type</ParamType>)</Code>
            - ...
        ```

    - After the code block, optionally include a `<Type/>`.
      - For propeties, this represents the type of the property.
      - For methods, this represents the type of the return value.
      - For style, you may optionally leave these off if the types are clear from context or `null`ish for the entire set of methods.

      ```markdown
        - `property` <Type>type</Type>
          - ...
      ```

    - After the term, indent and add an unordered list, containing only one list item which contains the definition of the term.

Here’s an actual example from the HTMLRewriter docs which puts this all together:

> <Definitions>
>
> - <Code>getAttribute(name<ParamType>String</ParamType>)</Code> <Type>String | null</Type>
>
>   - Returns the value for a given attribute name on the element, or `null` if it isn’t found.
>
> - <Code>hasAttribute(name<ParamType>String</ParamType>)</Code> <Type>Boolean</Type>
>
>   - Returns a boolean indicating whether an attribute exists on the element.
>
> - <Code>removeAttribute(name<ParamType>String</ParamType>)</Code> <Type>Element</Type>
>
>   - Removes the attribute.
>
> </Definitions>

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

Here’s what that example looks like:

``````txt
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

Workers-specific APIs are automatically highlighted in true Cloudflare spirit—in [orange](https://cloudflare.com).

```js
const instance = new RegularClass()

const rewriter = new HTMLRewriter()
```

### Terminals

<Aside type="warning">

__Warning:__ The API for custom terminal displays is currently in flux.

</Aside>

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

<Example>

Press <kbd>⌘</kbd> <kbd>F</kbd> (Command-F) to search for text within this document.

</Example>

```markdown
Press <kbd>⌘</kbd> <kbd>F</kbd> (Command-F) to
search for text within this document.
```

--------------------------------

## Details and summary

<Aside type="warning">

__Warning:__ This API is in active developement. Please don’t use until this notice is removed.

</Aside>

When you want to provide additional information in context, but you don’t want it to clutter up the more important content, use `<details/>` and `<summary/>`.

<details>
<summary>Details</summary>

Something _small enough_ to escape `casual` notice.

</details>

<details>
<summary>Details</summary>

Something _small enough_ to escape `casual` notice.

</details>

<details>
<summary>Details</summary>

Something _small enough_ to escape `casual` notice.

</details>

--------------------------------

## Directory

<Aside type="warning">

__Warning:__ This API is in active developement. Please don’t use until this notice is removed.

</Aside>

You can display a page listing of any depth by simplying including the `<DirectoryListing/>` component.

For example, here’s a directory listing for the docs engine part of the site.

<Example>
<DirectoryListing path="/docs-engine"/>
</Example>

```md
<DirectoryListing path="/docs-engine"/>
```

--------------------------------

## YouTube

To add a responsive YouTube video player to the page, include the `<YouTube/>` component.

<YouTube id="kdwfIrRJ4DE"/>

```md
<YouTube id="kdwfIrRJ4DE"/>
```
