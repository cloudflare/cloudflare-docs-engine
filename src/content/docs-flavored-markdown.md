---
title: Docs-flavored Markdown
hidden: true
---

# Docs-flavored Markdown

The Cloudflare Docs engine uses its own custom MDX/Markdown parsing to generate consistent and manageable markup, while offering flexibility to content authors.

> {warning} __Warning:__ This is a work-in-progress. The docs Markdown API is subject to change.

--------------------------------

## Links

For internal links—those you want to use `pushState` for—use `<Link/>`.

__Example:__ Here’s a link to <Link to="/tutorials">Tutorials</Link>.

```markdown
Here’s a link to <Link to="/tutorials">Tutorials</Link>.
```

For external link, use regular Markdown.

__Example:__ Here’s a link to [example.com](https://example.com).

```markdown
Here’s a link to [example.com](https://example.com).
```

> {note}
> __Note:__ We’re working on a solution which would allow content authors to use standard Markdown syntax for _all links_, but for now this is not available. If you prefer to use this syntax now, just note that until our solution is build, your links won’t get the benefit of faster routing through `@reach/router`.

--------------------------------

## Blockquotes

> This is a standard Markdown blockquote.
> It supports [links](https://example.com)
> and `<code/>`, and other nested markdown.
>
> Multiple paragraphs can be added as well.

```markdown
> This is a standard Markdown blockquote.
> It supports [links](https://example.com)
> and `<code/>`, and other nested markdown.
>
> Multiple paragraphs can be added as well.
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

--------------------------------

## Code blocks

### Terminal

```sh
npm install -g @cloudflare/wrangler
wrangler config
```


### JavaScript code

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

### CSS code

```css
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

### Markup with embedded CSS and JS

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
    <!-- TODO -->
  </body>
</html>
```
