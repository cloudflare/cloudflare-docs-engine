import React from "react"
import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"
import getUniqueReadableID from "../utils/get-unique-readable-id"
import AccessibleSVG from "./accessible-svg"

const titleID = getUniqueReadableID("title")

export default () => {
  const { product, productLogoPathD, productIconKey, logoSVGContent } = getCloudflareDocsConfig()

  return logoSVGContent ? (
    <span
      id={titleID}
      title={`Cloudflare ${productIconKey ? productIconKey : 'product'} logo`}
      dangerouslySetInnerHTML={{ __html: logoSVGContent }}
    />
  ) : (
    <AccessibleSVG title={`Cloudflare ${product} logo`} viewBox="0 0 48 48">
      <path d={productLogoPathD} />
    </AccessibleSVG>
  )
}
