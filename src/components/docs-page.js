import React from "react"
import PropTypes from "prop-types"

import SEO from "./seo" // TODO

import DocsMobileHeader from "./docs-mobile-header"
import DocsMobileTitleHeader from "./docs-mobile-title-header"
import DocsSidebar from "./docs-sidebar"
import DocsToolbar from "./docs-toolbar"
import DocsBody from "./docs-body"

import getPageTitle from "../utils/get-page-title"

const DocsPage = ({ pageContext, children }) => {
  const { frontmatter } = pageContext

  const title = getPageTitle(pageContext)
  const pageType = frontmatter && frontmatter.type ? frontmatter.type : "document"

  return (
    <div className="DocsPage">
      {/* TODO - bring back <Helmate htmlAttributes/> thing */}

      <DocsMobileHeader/>
      <DocsMobileTitleHeader/>
      <DocsSidebar/>
      <DocsToolbar/>

      <DocsBody>
        <SEO title={title} />

        <div className="DocsContent" page-type={pageType}>
          <div className="DocsMarkdown">
            {children}
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
