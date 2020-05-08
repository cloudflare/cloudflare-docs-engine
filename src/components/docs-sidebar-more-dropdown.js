import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import DocsTitle from "./docs-title"

const DocsSidebarMoreDropdown = () => {
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

  return (
    <div className="DocsSidebar--section-more Dropdown">
      <button className="DocsSidebar--section-more-button Button" aria-expanded="false" js-dropdown-button="">
        <div className="DocsSidebar--section-more-button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2,2v0m0,6v0m0,6v0z"/>
          </svg>
          <span is-visually-hidden=""><DocsTitle/> menu</span>
        </div>
      </button>

      <div className="DocsSidebar--section-more-dropdown Dropdown--dropdown">
        <ul className="Dropdown--list">
          {externalLinks.map(link => (
            <li className="Dropdown--item" key={link.url}>
              <a className="Dropdown--link" href={link.url}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DocsSidebarMoreDropdown
