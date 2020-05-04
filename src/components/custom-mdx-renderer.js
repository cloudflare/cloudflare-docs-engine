import React from "react"
import { graphql } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"

// import { YouTube, Twitter, TomatoBox } from "./ui"

// const globalMDXComponents = { Link, YouTube, Twitter, TomatoBox }
const globalMDXComponents = { Link }

const CustomMDXRenderer = ({ data: { mdx } }) => {
  return (
    <MDXProvider components={globalMDXComponents}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </MDXProvider>
  )
}

export default CustomMDXRenderer

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
