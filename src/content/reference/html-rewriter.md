# HTMLRewriter

The `HTMLRewriter` class allows you to parse, query, modify, format, and transform HTML inside your Workers app. It can be thought of similar to jQuery, but inside of a Worker script.

You can do all kinds of things with it, for example:

- [Transforming link URLs on the fly](https://blog.cloudflare.com/introducing-htmlrewriter/)
- [Scraping data from websites](https://workers.cloudflare.com/built-with/projects/web-scraper)
- [Converting websites into live APIs by parsing meta tags](https://workers.cloudflare.com/built-with/projects/web-scraper)
- [And so much more...](https://github.com/search?q=new+HTMLRewriter&type=Code)


--------------------------------


## Background

HTMLRewriter works by transforming the [Response](#) of a [Request](#). In order to achieve high performance, HTMLRewriter operates in a streaming fashion. In this way it is different than doing DOM manipulation in the browser and can take some getting used to.

One key difference is that unlike in-browser DOM manipulation where you can query and modify the document as often as you’d like, with HTMLRewriter, you get one pass through the document and that’s it.

--------------------------------

## Constructor

```js
const rewriter = new HTMLRewriter()
```

For each [Response](#) you wish to manipulate, you create one instance of the `HTMLRewriter` class and then apply all of your [handlers](#handlers) to it before running the [transformation](#methods).

### Methods

<dl>
<dt><code class="InlineCode InlineCode-is-definition">rewriter.on(<em>selector</em>, <em>elementHandler</em>)</code></dt>
<dd>Applies the <a href="#element-handlers"><code class="InlineCode">elementHandler</code></a> to every element which matches the CSS <a href="#selectors"><code class="InlineCode">selector</code></a></dd>

<dt><code class="InlineCode InlineCode-is-definition">rewriter.onDocument(<em>documentHandler</em>)</code></dt>
<dd>Applies the <a href="#document-handlers"><code class="InlineCode">documentHandler</code></a> to the document</dd>

<dt><code class="InlineCode InlineCode-is-definition">rewriter.transform(<em>response</em>)</code></dt>
<dd>Initiates the transformation, causing the handlers to begin to apply</dd>
</dl>

--------------------------------

## Selectors

The following table lists the CSS selectors supported when attaching an [element handler](#element-handlers) to an `HTMLRewriter` instance using the [`.on`](#methods) method.

<table>
<thead>
<tr>
<th>Pattern</th>
<th>Represents</th>
</tr>
</thead>

<tbody>
<tr>
<td><code class="InlineCode InlineCode-is-nowrap">*</code></td>
<td>any element</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E</code></td>
<td>any element of type E</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E:not(s)</code></td>
<td>an E element that does not match either compound selector s</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E.warning</code></td>
<td>an E element belonging to the class warning</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E#myid</code></td>
<td>an E element with ID equal to myid.</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo]</code></td>
<td>an E element with a foo attribute</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo="bar"]</code></td>
<td>an E element whose foo attribute value is exactly equal to bar</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo="bar" i]</code></td>
<td>an E element whose foo attribute value is exactly equal to any (ASCII-range) case-permutation of bar</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo="bar" s]</code></td>
<td>an E element whose foo attribute value is exactly and case-sensitively equal to bar</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo~="bar"]</code></td>
<td>an E element whose foo attribute value is a list of whitespace-separated values, one of which is exactly equal to bar</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo^="bar"]</code></td>
<td>an E element whose foo attribute value begins exactly with the string bar</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo$="bar"]</code></td>
<td>an E element whose foo attribute value ends exactly with the string bar</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo*="bar"]</code></td>
<td>an E element whose foo attribute value contains the substring bar</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E[foo|=“en”]</code></td>
<td>an E element whose foo attribute value is a hyphen-separated list of values beginning with en</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E F</code></td>
<td>an F element descendant of an E element</td>
</tr>

<tr>
<td><code class="InlineCode InlineCode-is-nowrap">E > F</code></td>
<td>an F element child of an E element</td>
</tr>
</tbody>
</table>

## Handlers

Handlers work similar to event listeners, providing a callback when e.g. elements or text are found as HTMLRewriter parses the content.

There are two types of handlers, [element handlers](#element-handlers) and [document handlers](#document-handlers).

### Element handlers

```js
class ElementHandler {
  element(element)  { /* ... */ }
  text(text)        { /* ... */ }
  comments(comment) { /* ... */ }
}
```

Element handlers are attached to an `HTMLRewriter` instance using the [`.on`](#methods) method. Attached handlers will then respond to `element`, `text`, and `comments` callbacks.

<Aside header={(<strong>Tip</strong>)}>

Element handlers can be named whatever you’d like, or they can even be written as an inline anonymous <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">ES6 class instance</a>. One benefit though of instantiating a named class is that you’re able to <a href="#">reference it later</a>.

</Aside>

#### Callbacks

<dl>
<dt><code class="InlineCode InlineCode-is-definition">element(element)</code></dt>
<dd>The matching element node</dd>

<dt><code class="InlineCode InlineCode-is-definition">text(text)</code></dt>
<dd>Text nodes which are children of the matching <code class="InlineCode">element</code> are returned <a href="#text-chunks">in chunks</a></dd>

<dt><code class="InlineCode InlineCode-is-definition">comments(comments)</code></dt>
<dd>HTML comment nodes which are children of the matching <code class="InlineCode">element</code> are returned</dd>
</dl>

#### Example

```js
async function handleRequest(request) {
  const response = await fetch(request)

  const rewriter = new HTMLRewriter()

  rewriter.on("div", {
    element(element) {
      console.log(element.tagName) // "div"
    }
  })

  return rewriter.transform(response)
}
```

--------------------------------

Coming soon...
