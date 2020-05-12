import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import DocsTitle from "./docs-title"
import Dropdown from "./dropdown"

const ExternalLinks = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            cloudflareDocs {
              externalLinks {
                title
                url
              }
            }
          }
        }
      }
    `
  )

  const externalLinks = site.siteMetadata.cloudflareDocs.externalLinks

  return children(externalLinks)
}

const DocsSidebarMoreDropdown = () => {
  const className = "DocsSidebar--section-more"
  const buttonClassName = className + "-button"
  const buttonIconClassName = buttonClassName + "-icon"
  const props = { className, buttonClassName }

  props.buttonChildren = (
    <div className={buttonIconClassName}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2,2v0m0,6v0m0,6v0z"/>
      </svg>
      <span is-visually-hidden=""><DocsTitle/> menu</span>
    </div>
  )

  return (
    <Dropdown {...props}>
      {({ expanded }) => (
        <div className={className + "-dropdown Dropdown--dropdown"}>
          <ul className="Dropdown--list">
            <ExternalLinks>
              {links => links.map(link => (
                <li className="Dropdown--item" key={link.url}>
                  <a className="Dropdown--link" href={link.url} tabIndex={expanded ? 0 : -1}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ExternalLinks>
          </ul>
        </div>
      )}
    </Dropdown>
  )
}

export default DocsSidebarMoreDropdown
