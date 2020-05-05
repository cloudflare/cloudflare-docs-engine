import React from "react"
import PropTypes from "prop-types"

import SEO from "./seo" // TODO

import DocsMobileHeader from "./docs-mobile-header"
import DocsMobileTitleHeader from "./docs-mobile-title-header"
import DocsSidebar from "./docs-sidebar"
import DocsToolbar from "./docs-toolbar"
import DocsTableOfContents from "./docs-table-of-contents"

import getPageTitle from "../utils/get-page-title"
import getPageType from "../utils/get-page-type"
import getTableOfContents from "../utils/get-table-of-contents"

const DocsPage = ({ pageContext, children }) => {
  const title = getPageTitle(pageContext)
  const pageType = getPageType(pageContext)
  const tableOfContents = getTableOfContents(pageContext)

  return (
    <>
      {/* TODO - bring back <Helmet htmlAttributes/> thing */}
      <SEO title={title}/>

      <div className="DocsPage">
        <DocsMobileHeader/>
        <DocsMobileTitleHeader/>
        <DocsSidebar/>
        <DocsToolbar/>

        <div className="DocsBody">
          {pageType === "document" && tableOfContents && (
            <div className="DocsBody--sidebar" with-styled-webkit-scrollbars="">
              <div className="DocsBody--sidebar-content-scroll-fade"></div>
              <div className="DocsBody--sidebar-content">
                <DocsTableOfContents items={tableOfContents}/>
              </div>
            </div>
          )}

          <div className="DocsContent" page-type={pageType}>
            <div className="DocsMarkdown">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

DocsPage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DocsPage
