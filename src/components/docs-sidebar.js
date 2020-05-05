import React from "react"
import { Link } from "gatsby"

import DocsTitle from "./docs-title"
import DocsSidebarNav from "./docs-sidebar-nav"

const DocsSidebar = () => (
  <div className="DocsSidebar" with-styled-webkit-scrollbars="">
    <div className="DocsSidebar--sections">

      <div className="DocsSidebar--section DocsSidebar--header-section">
        <a className="DocsSidebar--cloudflare-logo-link DocsSidebar--link" href="https://docs.cloudflare.com">
          <div className="DocsNavLogoLockup">
            <div className="DocsNavLogoLockup--logo">
              <svg id="CloudflareDocsLogomark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-labelledby="CloudflareDocsLogomark--title CloudflareDocsLogomark--desc" fill="currentColor">
                <defs>
                  <title id="CloudflareDocsLogomark--title">Cloudflare docs logomark</title>
                  <desc id="CloudflareDocsLogomark--desc">The logo for Cloudflare used in the Cloudflare’s developer documentation.</desc>
                </defs>
                <path d="M31.236 28.717c-.373-.548-1.003-.864-1.76-.9l-14.353-.195a.262.262 0 01-.221-.122.348.348 0 01-.035-.267.396.396 0 01.338-.268l14.48-.195c1.714-.085 3.58-1.533 4.232-3.309l.828-2.25a.503.503 0 00.023-.292c-.932-4.404-4.698-7.689-9.198-7.689-4.15 0-7.672 2.798-8.931 6.679a4.156 4.156 0 00-2.973-.864c-1.994.207-3.59 1.874-3.789 3.954a4.84 4.84 0 00.105 1.545c-3.253.097-5.853 2.871-5.853 6.29 0 .304.024.608.059.912.023.146.14.256.28.256h26.488c.151 0 .291-.11.338-.268l.198-.742c.245-.876.152-1.68-.256-2.275zM36.062 21.39c-.128 0-.268 0-.396.012-.093 0-.175.073-.21.17l-.56 2.032c-.244.876-.151 1.679.257 2.275.373.548 1.003.864 1.76.9l3.055.195c.093 0 .175.049.222.122a.356.356 0 01.035.267.396.396 0 01-.339.268l-3.182.195c-1.726.085-3.58 1.532-4.232 3.309l-.234.62c-.046.122.035.243.164.243h10.935a.289.289 0 00.28-.219 8.654 8.654 0 00.292-2.214c0-4.501-3.521-8.175-7.847-8.175"/>
              </svg>
            </div>
            <span className="DocsNavLogoLockup--text">
              <span data-text="Cloudflare">Cloudflare</span>&nbsp;
              <span data-text="Docs">Docs</span>
            </span>
          </div>
        </a>
      </div>

      <div className="DocsSidebar--section-separator"></div>

      <div className="DocsSidebar--section DocsSidebar--docs-title-section">
        <Link className="DocsSidebar--docs-title-logo-link DocsSidebar--link" to="/">
          <div className="DocsNavLogoLockup">
            <div className="DocsNavLogoLockup--logo">
              <svg id="WorkersDashboardLogomark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-labelledby="WorkersDashboardLogomark--title WorkersDashboardLogomark--desc" fill="currentColor">
                <defs>
                  <title id="WorkersDashboardLogomark--title">Cloudflare Workers dashboard logomark</title>
                  <desc id="WorkersDashboardLogomark--desc">The logomark used to represent Cloudflare Workers inside the Cloudflare dashboard.</desc>
                </defs>
                <path d="M13.112 9.832c.164-.276.362-.528.59-.75l3.71 6.508-4.02 7.054a3.742 3.742 0 000 3.712l4.02 7.056a14410.466 14410.466 0 00-3.705 6.511 3.648 3.648 0 01-.595-.755L5.495 26.3a3.517 3.517 0 010-3.6l7.617-12.868zM31.617 41h-5.354l8.346-14.644a3.742 3.742 0 000-3.712L26.263 8h5.354c1.355 0 2.602.702 3.27 1.832L42.506 22.7a3.517 3.517 0 010 3.6l-7.617 12.868c-.669 1.13-1.916 1.832-3.27 1.832zm-15.234 0c-.088 0-.176-.003-.263-.009l1.504-2.644c1.564-2.747 3.91-6.867 7.04-12.36a3 3 0 000-2.974L16.114 8.01c.089-.006.179-.009.269-.009h6.858l9.095 15.959c.193.338.193.744 0 1.082L23.24 41h-6.858z"/>
              </svg>
            </div>
            <span className="DocsNavLogoLockup--text"><DocsTitle/></span>
          </div>
        </Link>

        <div className="DocsSidebar--section-more Dropdown" js-dropdown-root="">
          <button className="DocsSidebar--section-more-button Button" aria-expanded="false" js-dropdown-button="">
            <div className="DocsSidebar--section-more-button-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2,2v0m0,6v0m0,6v0z"/>
              </svg>
              <span is-visually-hidden=""><DocsTitle/> menu</span>
            </div>
          </button>

          <div className="DocsSidebar--section-more-dropdown Dropdown--dropdown" js-dropdown="">
            <ul className="Dropdown--list">
              <li className="Dropdown--item">
                <a className="Dropdown--link" href="https://workers.cloudflare.com">Workers home</a>
              </li>
              <li className="Dropdown--item">
                <a className="Dropdown--link" href="https://cloudflareworkers.com">Playground</a>
              </li>
              <li className="Dropdown--item">
                <a className="Dropdown--link" href="https://workers.cloudflare.com/#plans">Pricing</a>
              </li>
            </ul>
            <a js-dropdown-trap-focus="" is-visually-hidden="" href="./">Focus trap</a>{/* TODO */}
          </div>
        </div>
      </div>

      <div className="DocsSidebar--section DocsSidebar--nav-section" is-smooth-scrolling="">
        <div className="DocsSidebar--section-shadow"></div>
        <div className="DocsSidebar--section-shadow-cover"></div>

        <DocsSidebarNav/>
      </div>

      {/* TODO */}
      {/*
        <ul className="DocsSidebar--nav">
          <li className="DocsSidebar--nav-item">
            <a className="DocsSidebar--nav-link DocsSidebar--link" is-active="" href="./">
              <div className="DocsSidebar--nav-link-highlight"></div>
              <span className="DocsSidebar--nav-link-text">Welcome</span>
            </a>
          </li>
          <li className="DocsSidebar--nav-item">
            <a className="DocsSidebar--nav-link DocsSidebar--link" href="./tutorials/">
              <div className="DocsSidebar--nav-link-highlight"></div>
              <span className="DocsSidebar--nav-link-text">Tutorials</span>
            </a>
          </li>
          <li className="DocsSidebar--nav-item">
            <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
              <div className="DocsSidebar--nav-link-highlight"></div>
              <span className="DocsSidebar--nav-link-text">Examples</span>
            </a>
          </li>
          <li className="DocsSidebar--nav-item" js-nav-expand-collapse-root="">
            <button className="Button DocsSidebar--nav-expand-collapse-button" js-nav-expand-collapse-button="">
              <span className="DocsSidebar--nav-expand-collapse-button-content"></span>
            </button>

            <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
              <div className="DocsSidebar--nav-link-highlight"></div>
              <span className="DocsSidebar--nav-link-text">Learning</span>
            </a>

            <div className="DocsSidebar--nav-item-collapse-wrapper" js-nav-expand-collapse="">
              <ul className="DocsSidebar--nav-subnav">
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./learning/how-workers-works">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">How Workers works</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">The Request context</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">FetchEvent lifecycle</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Debugging</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Routing</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Cloudflare Cache</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Security</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Pricing</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Limits</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="DocsSidebar--nav-item" js-nav-expand-collapse-root="">
            <button className="Button DocsSidebar--nav-expand-collapse-button" js-nav-expand-collapse-button="">
              <span className="DocsSidebar--nav-expand-collapse-button-content"></span>
            </button>

            <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
              <div className="DocsSidebar--nav-link-highlight"></div>
              <span className="DocsSidebar--nav-link-text">Reference</span>
            </a>

            <div className="DocsSidebar--nav-item-collapse-wrapper" js-nav-expand-collapse="">
              <ul className="DocsSidebar--nav-subnav">
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Environment</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Web Standards</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Fetch</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">FetchEvent</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Request</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Response</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./reference/html-rewriter">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">HTMLRewriter</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Streams</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Cache</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Encoding</span>
                  </a>
                </li>
                <li className="DocsSidebar--nav-item">
                  <a className="DocsSidebar--nav-link DocsSidebar--link" href="./">
                    <div className="DocsSidebar--nav-link-highlight"></div>
                    <span className="DocsSidebar--nav-link-text">Web Crypto</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      */}

    </div>

    <div className="DocsSidebar--shadow"></div>
  </div>
)

export default DocsSidebar
