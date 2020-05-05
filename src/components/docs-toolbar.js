import React from "react"

import ColorSchemeToggle from "./color-scheme-toggle"

const DocsToolbar = () => (
  <div className="DocsToolbar">
    <div className="DocsToolbar--search">
      <div className="DocsSearch">
        <div className="DocsSearch--input-wrapper">
          <input className="DocsSearch--input" type="text" spellCheck="false" autoComplete="false" placeholder="Search Workers docs..."/>
          <div className="DocsSearch--input-icon">
            <svg id="SearchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" aria-labelledby="SearchIcon--title SearchIcon--desc" fill="currentColor">
              <defs>
                <title id="SearchIcon--title">Search icon</title>
                <desc id="SearchIcon--desc">A magnifying glass used to illustrate the concept of search.</desc>
              </defs>
              <path d="M11.999 10.585l3.458 3.458a1 1 0 01-1.414 1.414L10.585 12a6.5 6.5 0 111.414-1.414zM6.75 11.5a4.75 4.75 0 100-9.5 4.75 4.75 0 000 9.5z"/>
            </svg>
          </div>
          <div className="DocsSearch--input-bottom-border"></div>
        </div>
      </div>
    </div>

    <div className="DocsToolbar--tools">
      <div className="DocsToolbar--color-scheme-toggle">
        <ColorSchemeToggle/>
      </div>
    </div>
  </div>
)

export default DocsToolbar
