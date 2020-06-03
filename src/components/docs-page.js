import React from "react"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"

import Helmet from "react-helmet"
import SEO from "./seo"

import SmoothScrollHashChanges from "./smooth-scroll-hash-changes"
import Breadcrumbs from "./breadcrumbs"

import DocsMobileHeader from "./docs-mobile-header"
import DocsMobileTitleHeader from "./docs-mobile-title-header"
import DocsSidebar from "./docs-sidebar"
import DocsToolbar from "./docs-toolbar"
import DocsTableOfContents from "./docs-table-of-contents"
import { className as docsMarkdownClassName } from "./mdx/root"
import DocsFooter from "./docs-footer"

import getPageTitle from "../utils/get-page-title"
import getPageType from "../utils/get-page-type"
import getTableOfContents from "../utils/get-table-of-contents"
import hasBreadcrumbs from "../utils/has-breadcrumbs"

const DocsPage = ({ pageContext: page, children, location }) => {
  const title = getPageTitle(page)
  const pageType = getPageType(page)
  const tableOfContents = getTableOfContents(page)

  return (
    <>
      <SEO title={title}/>

      <Helmet>
        <html is-docs-page=""/>
      </Helmet>

      <SmoothScrollHashChanges/>

      <SkipNavLink contentId="docs-content" className="SkipNavLink"/>

      <div className="DocsPage">
        <DocsMobileHeader/>
        <DocsMobileTitleHeader/>
        <DocsSidebar/>
        <DocsToolbar/>

        <main className="DocsBody">
          {pageType === "document" && tableOfContents && (
            <div className="DocsBody--sidebar" with-styled-webkit-scrollbars="">
              <div className="DocsBody--sidebar-content-scroll-fade"></div>
              <div className="DocsBody--sidebar-content">
                <nav>
                  <DocsTableOfContents items={tableOfContents}/>
                </nav>
              </div>
            </div>
          )}

          <SkipNavContent id="docs-content"/>

          <div className="DocsContent" page-type={pageType}>
            {hasBreadcrumbs(page) && (
              <Breadcrumbs className="DocsContent--breadcrumbs" location={location}/>
            )}

            <article className={docsMarkdownClassName()}>
              {children}
            </article>
          </div>
        </main>

        <DocsFooter page={page}/>
      </div>
    </>
  )
}

export default DocsPage
