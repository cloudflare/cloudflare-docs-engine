import React, { useEffect } from "react"

import Helmet from "react-helmet"
import DocsTitle from "./docs-title"

const DocsSearch = () => {
  useEffect(() => {
    let frames = 0
    const init = () => {
      frames += 1

      // TODO - find workaround for this hack
      // (which is only needed for local developement because of how Helmet works)
      if (!window.docsearch && frames < 60) {
        return requestAnimationFrame(() => init())
      }

      window.docsearch({
        apiKey: '4a3bbdb939606486b94f9ce867bfd4f5', // TODO - use dotenv ala https://www.gatsbyjs.org/docs/adding-search-with-algolia/
        indexName: 'workers-cloudflare', // TODO - generic to all Cloudflare products
        inputSelector: '#DocsSearch--input', // TODO - pass DOM in with Reacth.createRef?
      })
    }

    init()
  }, [])

  return (
    <>
      <Helmet>
        {/* TODO - include in source */}
        <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"/>
      </Helmet>

      <div className="DocsSearch">
        <div className="DocsSearch--input-wrapper">
          <input id="DocsSearch--input" className="DocsSearch--input" type="text" spellCheck="false" autoComplete="false" placeholder={"Search " + DocsTitle() + " docs..."}/>
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
    </>
  )
}

export default DocsSearch
