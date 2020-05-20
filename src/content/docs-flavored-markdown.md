---
title: Docs-flavored Markdown
hidden: true
breadcrumbs: false
---

# Docs-flavored Markdown

The Cloudflare Docs engine uses its own custom MDX/Markdown parsing to generate consistent and manageable markup, while offering flexibility to content authors.

> {warning} __Warning:__ This doc is a work-in-progress, and likely to change substantially before release.

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

### Terminal

```sh
npm install -g @cloudflare/wrangler
wrangler config
```

### JavaScript code with filename

```js
---
filename: worker.js
---
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

### CSS code with highlighted lines

```css
---
highlight: [12, 13, 18]
---
:root {
  --color-rgb: 8, 10, 60;
  --color: rgb(var(--color-rgb));
}

.Class {
  box-sizing: border-box;
  width: calc(80vw - 2em);
  padding: 1em;
  color: var(--color);

  --bg-alpha: .5;
  background-color: rgba(var(--color-rgb), var(--bg-alpha));
}

@supports (backdrop-filter: blur(1em)) {
  .Class {
    --bg-alpha: .1;
    backdrop-filter: saturate(200%) blur(1.25em);
  }
}
```

### Markdown code

```markdown
# Markdown header

This is a paragraph with __bold__ and _italics_ contained within it.

- This is a list item.
- This is another list item with a [link](https://example.com) in it.

This is the end.
```

### HTML with embedded JS/CSS

```html
<!DOCTYPE html>
<html theme="light">
  <head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <script>
      (() => {
        getThemeFromStorage = () => {
          let storedTheme

          const query = window.matchMedia("(prefers-color-scheme: dark)")
          const queryTheme = query.matches ? "dark" : "light"

          try {
            const theme = JSON.parse(localStorage.theme)
            const themeIsValid = ["dark", "light"].includes(theme.theme)
            const themeWasRecentlySet = theme.updated > +new Date - (30 * 60 * 1000)

            if (themeIsValid && themeWasRecentlySet) {
              storedTheme = theme.theme
            }
          } catch (error) {}

          return storedTheme || queryTheme
        }

        document.documentElement.setAttribute("theme", getThemeFromStorage())
      })()
    </script>

    <style>
      html {
        -webkit-font-smoothing: antialiased;
        background: #fff;
        color: #000;
      }

      html[theme="dark"] {
        background: #000;
        color: #fff;
      }

      :root {
        --color-rgb: 8, 10, 60;
        --color: rgb(var(--color-rgb));
      }

      .Class {
        box-sizing: border-box;
        width: calc(80vw - 2em);
        padding: 1em;
        color: var(--color);

        --bg-alpha: .5;
        background-color: rgba(var(--color-rgb), var(--bg-alpha));
      }

      @supports (backdrop-filter: blur(1em)) {
        .Class {
          --bg-alpha: .1;
          backdrop-filter: saturate(200%) blur(1.25em);
        }
      }
    </style>
  </head>

  <body>
    <!-- ... -->
  </body>
</html>
```

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
