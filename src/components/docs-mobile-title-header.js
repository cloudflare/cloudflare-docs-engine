import React from "react"
import { Link } from "gatsby"

import { sidebarToggle } from "../utils/mobile-sidebar-manipulation"
import IconNavMenu from "./icons/nav-menu"

import DocsTitle from "./docs-title"
import DocsProductLogo from "./docs-product-logo"
import DocsNavLogoLockup from "./docs-nav-logo-lockup"

const DocsMobileTitleHeader = () => (
  <div className="DocsMobileTitleHeader">
    {/* TODO - get URL from Gatsby config? */}
    <Link className="DocsMobileTitleHeader--logo-link Link Link-without-underline" to="/">
      <DocsNavLogoLockup
        logo={<DocsProductLogo/>}
        text={<DocsTitle/>}
      />
    </Link>

    <button className="Button DocsMobileTitleHeader--sidebar-toggle-button" onClick={() => sidebarToggle()}>
      <IconNavMenu className="DocsMobileTitleHeader--sidebar-toggle-button-icon"/>
    </button>
  </div>
)

export default DocsMobileTitleHeader
