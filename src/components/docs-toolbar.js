import React from "react"

import DocsSearch from "./docs-search"
import ThemeToggle from "./theme-toggle"

const DocsToolbar = () => (
  <div className="DocsToolbar">
    <div className="DocsToolbar--search">
      <DocsSearch/>
    </div>

    <div className="DocsToolbar--tools">
      <div className="DocsToolbar--theme-toggle">
        <ThemeToggle/>
      </div>
    </div>
  </div>
)

export default DocsToolbar
