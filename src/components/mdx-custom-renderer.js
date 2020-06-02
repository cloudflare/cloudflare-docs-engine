import React from "react"
import { graphql, Link } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import a from "./mdx/anchor-link"
import headers from "./mdx/headers"
import inlineCode from "./mdx/inline-code"
import pre from "./mdx/code-block"
import blockquote from "./mdx/blockquote"
import Definitions from "./mdx/definitions"
import Code from "./mdx/code"
import ParamType from "./mdx/param-type"
import Type from "./mdx/type"
import DirectoryListing from "./mdx/directory-listing"
import YouTube from "./mdx/youtube"

// https://mdxjs.com/table-of-components
// https://www.gatsbyjs.org/docs/mdx/customizing-components/
const components = {
  // Replace markdown
  a,
  ...headers,
  inlineCode,
  pre,
  blockquote,
  // img, // TODO - img
  // thematicBreak, // TODO - consider custom thematicBreak `***` implementation

  // Gatsby components
  Link,

  // Custom components for composing reference docs
  Definitions,
  Code,
  ParamType,
  Type,

  // Miscellaneous custom components
  DirectoryListing,
  YouTube,
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
