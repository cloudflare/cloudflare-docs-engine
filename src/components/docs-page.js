import React from "react"
import PropTypes from "prop-types"

import SEO from "./seo" // TODO

import DocsMobileHeader from "./docs-mobile-header"
import DocsMobileTitleHeader from "./docs-mobile-title-header"
import DocsSidebar from "./docs-sidebar"
import DocsToolbar from "./docs-toolbar"
import DocsBody from "./docs-body"

import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
// import { YouTube, Twitter, TomatoBox } from "./ui"

import getPageTitle from "../utils/get-page-title"

// const globalMDXComponents = { Link, YouTube, Twitter, TomatoBox }
const globalMDXComponents = { Link }

const DocsPage = ({ pageContext, children }) => {
  const { frontmatter } = pageContext

  console.log(pageContext)

  // console.log(getPageTitle(pageContext))
  // console.log(frontmatter)

  const pageType = frontmatter && frontmatter.type ? frontmatter.type : "document"

  // const { site } = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //           description
  //           author
  //         }
  //       }
  //     }
  //   `
  // )

  return (
    <div className="DocsPage">
      {/* TODO - bring back <Helmate htmlAttributes/> thing */}

      <DocsMobileHeader/>
      <DocsMobileTitleHeader/>
      <DocsSidebar/>
      <DocsToolbar/>

      <DocsBody>
        <SEO title="Learning" /> {/* TODO */}

        <div className="DocsContent" page-type={pageType}>
          <div className="DocsMarkdown">
            <MDXProvider components={globalMDXComponents}>
              {children}
            </MDXProvider>
          </div>
        </div>
      </DocsBody>

    </div>
  )
}

DocsPage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DocsPage
