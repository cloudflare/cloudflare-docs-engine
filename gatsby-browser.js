// See: https://www.gatsbyjs.org/docs/browser-apis/

// Required until wider support
// https://caniuse.com/#search=focus-visible
import "focus-visible-polyfill"

import "@cloudflare/cloudflare-brand-assets/css/global/box-sizing.css"
import "@cloudflare/cloudflare-brand-assets/css/global/element-normalization.css"
import "@cloudflare/cloudflare-brand-assets/css/global/sizes-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/font-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/brand-color-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/theme-color-variables.css"
import "@cloudflare/cloudflare-brand-assets/css/global/theme-helpers.css"
import "@cloudflare/cloudflare-brand-assets/css/global/selection-color.css"
import "@cloudflare/cloudflare-brand-assets/css/global/html.css"

import "@cloudflare/cloudflare-brand-assets/css/helpers/desktop-and-mobile-only.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/is-smooth-scrolling.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/is-visually-hidden.css"
import "@cloudflare/cloudflare-brand-assets/css/helpers/with-styled-webkit-scrollbars.css"

// TODO: should these be imported by their respective components?
import "@cloudflare/cloudflare-brand-assets/css/components/aspect-ratio.css"
import "@cloudflare/cloudflare-brand-assets/css/components/breadcrumbs.css"
import "@cloudflare/cloudflare-brand-assets/css/components/button.css"
import "@cloudflare/cloudflare-brand-assets/css/components/cloudflare-logo.css"
import "@cloudflare/cloudflare-brand-assets/css/components/cloudflare-workers-logo.css"
import "@cloudflare/cloudflare-brand-assets/css/components/code-block.css"
import "@cloudflare/cloudflare-brand-assets/css/components/theme-toggle.css"
import "@cloudflare/cloudflare-brand-assets/css/components/dropdown.css"
import "@cloudflare/cloudflare-brand-assets/css/components/inline-code.css"
import "@cloudflare/cloudflare-brand-assets/css/components/link.css"
import "@cloudflare/cloudflare-brand-assets/css/components/network-map.css"
import "@cloudflare/cloudflare-brand-assets/css/components/scrollbars.css"
import "@cloudflare/cloudflare-brand-assets/css/components/stream-video.css"
import "@cloudflare/cloudflare-brand-assets/css/components/superscript.css"
import "@cloudflare/cloudflare-brand-assets/css/components/tooltip.css"

// TODO: should these be imported by their respective components?
import "./src/css/docs/components/skip-nav-link.css"
import "./src/css/docs/components/tags-filter.css"
import "./src/css/docs/components/worker-starter.css"
import "./src/css/docs/components/architecture-diagram.css"
import "./src/css/docs/components/docs-noscript.css"
import "./src/css/docs/components/docs-nav-logo-lockup.css"
import "./src/css/docs/components/docs-page.css"
import "./src/css/docs/components/docs-sidebar.css"
import "./src/css/docs/components/docs-body.css"
import "./src/css/docs/components/docs-table-of-contents.css"
import "./src/css/docs/components/docs-content.css"
import "./src/css/docs/components/docs-markdown.css"
import "./src/css/docs/components/docs-toolbar.css"
import "./src/css/docs/components/docs-search.css"
import "./src/css/docs/components/docs-mobile-header.css"
import "./src/css/docs/components/docs-mobile-title-header.css"
import "./src/css/docs/components/docs-mobile-nav-backdrop.css"
import "./src/css/docs/components/docs-footer.css"
import "./src/css/docs/components/docs-code-examples-overview.css"
import "./src/css/docs/components/docs-tutorials.css"


exports.onRouteUpdate = ({ location }) => {
  const domElem = document.querySelector(`link[rel='canonical']`)
  const existingValue = domElem.getAttribute(`href`)
  const baseProtocol = domElem.getAttribute(`data-baseProtocol`)
  const baseHost = domElem.getAttribute(`data-baseHost`)
  
  location.pathname = !location.pathname.endsWith('/') ? '/' : location.pathname;

  if (existingValue && baseProtocol && baseHost) {
    let value = `${baseProtocol}//${baseHost}${location.pathname}${location.hash}`

    domElem.setAttribute(`href`, `${value}`)
  }
}
