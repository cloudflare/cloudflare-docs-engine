import React from "react"
import { graphql } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

import headers from "./mdx/headers"
import inlineCode from "./mdx/inline-code"
import pre from "./mdx/code-block"

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
  inlineCode,
  ...headers,
  pre, // TODO - figure out why `code:` didn’t work here
  Link,
}

const MDXCustomRenderer = ({ data: { mdx } }) => {
  return (
    <MDXProvider components={components}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </MDXProvider>
  )
}

export default MDXCustomRenderer

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
