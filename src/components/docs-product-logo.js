import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import DocsTitle from "./docs-title"
import AccessibleSVG from "./accessible-svg"

const ProductLogoPathD = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            cloudflareDocs {
              productLogoPathD
            }
          }
        }
      }
    `
  )

  return site.siteMetadata.cloudflareDocs.productLogoPathD
}

const DocsProductLogo = () => (
  <AccessibleSVG viewBox="0 0 48 48" title={"Cloudflare " + DocsTitle() + " logo"}>
    <path d={ProductLogoPathD()}/>
  </AccessibleSVG>
)

export default DocsProductLogo
