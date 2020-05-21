import React from "react"

import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"

import AccessibleSVG from "./accessible-svg"

export default () => {
  const { product, productLogoPathD }  = getCloudflareDocsConfig()

  return (
    <AccessibleSVG viewBox="0 0 48 48" title={`Cloudflare ${product} logo`}>
      <path d={productLogoPathD}/>
    </AccessibleSVG>
  )
}
