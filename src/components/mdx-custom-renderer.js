import React from "react"
import { graphql } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

import CodeBlock from "./code-block"

const inlineCode = props => (
  <code className="InlineCode">{props.children}</code>
)

const header = (TagName) => (props => {
  const href = `#${ props.id }`

  return (
    <TagName id={props.id}>
      <span className="DocsMarkdown--header-anchor-positioner">
        <a className="DocsMarkdown--header-anchor Link Link-without-underline" href={href} aria-hidden="true">&#8203;</a>
      </span>
      <span>{props.children}</span>
    </TagName>
  )
})

// https://www.gatsbyjs.org/docs/mdx/customizing-components/
const components = {
  Link,
  inlineCode,
  h2: header('h2'),
  h3: header('h3'),
  h4: header('h4'),
  pre: CodeBlock, // TODO - figure out why `code:` didn’t work here
  // StreamVideo, // TODO
  // YouTube, // TODO
}

const MDXCustomRenderer = ({ data: { mdx } }) => {
  return (
    <MDXProvider components={components}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </MDXProvider>
  )
}

export default MDXCustomRenderer

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
