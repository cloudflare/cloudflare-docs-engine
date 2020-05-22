// See: https://www.gatsbyjs.org/docs/browser-apis/

// Required until wider support
// https://caniuse.com/#search=focus-visible
import "focus-visible-polyfill"

// TODO - move these to @cloudflare/ui or similar
import "./src/css/ui/global/box-sizing.css"
import "./src/css/ui/global/element-normalization.css"
import "./src/css/ui/global/sizes-variables.css"
import "./src/css/ui/global/font-variables.css"
import "./src/css/ui/global/brand-color-variables.css"
import "./src/css/ui/global/theme-color-variables.css"
import "./src/css/ui/global/theme-helpers.css"
import "./src/css/ui/global/selection-color.css"
import "./src/css/ui/global/html.css"

import "./src/css/ui/helpers/desktop-and-mobile-only.css"
import "./src/css/ui/helpers/is-smooth-scrolling.css"
import "./src/css/ui/helpers/is-visually-hidden.css"
import "./src/css/ui/helpers/with-styled-webkit-scrollbars.css"

// TODO - should these be imported by their respective components?
import "./src/css/ui/components/css-transition-fade-lift.css"
import "./src/css/ui/components/aspect-ratio.css"
import "./src/css/ui/components/breadcrumbs.css"
import "./src/css/ui/components/button.css"
import "./src/css/ui/components/cloudflare-logo.css"
import "./src/css/ui/components/cloudflare-workers-logo.css"
import "./src/css/ui/components/code-block.css"
import "./src/css/ui/components/theme-toggle.css"
import "./src/css/ui/components/dropdown.css"
import "./src/css/ui/components/inline-code.css"
import "./src/css/ui/components/link.css"
import "./src/css/ui/components/network-map.css"
import "./src/css/ui/components/scrollbars.css"
import "./src/css/ui/components/stream-video.css"
import "./src/css/ui/components/superscript.css"

// TODO - should these be imported by their respective components?
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
import "./src/css/docs/components/docs-mobile-nav.css"
import "./src/css/docs/components/docs-mobile-title-header.css"
import "./src/css/docs/components/docs-tutorials.css"
