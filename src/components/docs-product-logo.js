import React from "react"
import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"
import getUniqueReadableID from "../utils/get-unique-readable-id"

const titleID = getUniqueReadableID("title")

export default () => {
  const { product,  productIconKey,  logoSVGContent}  = getCloudflareDocsConfig()

  return (
    <span id={titleID} title={`Cloudflare ${productIconKey} logo`} dangerouslySetInnerHTML={{__html: logoSVGContent}} />
  )
}
