import React from "react"
import TimeAgo from "react-timeago"

import AnchorLink from "./mdx/anchor-link"
import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"

export default ({ page }) => {
  if (!page || !page.parent) return null

  const { modifiedTime, relativePath } = page.parent
  const { contentRepo }  = getCloudflareDocsConfig()

  const editOnGithubURL = `https://github.com/${contentRepo}/blob/master/src/content/${relativePath}`

  return (
    <footer className="DocsFooter">
      <div className="DocsFooter--content">
        <div>
          <AnchorLink href={editOnGithubURL}>Edit on Github</AnchorLink>
          {" "}&nbsp; · &nbsp;{" "}
          Updated{" "}
          <TimeAgo date={modifiedTime} minPeriod={60}/>
        </div>
      </div>
    </footer>
  )
}
