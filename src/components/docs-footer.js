import React from "react"
import TimeAgo from "react-timeago"

import getCloudflareDocsConfig from "../utils/get-cloudflare-docs-config"

export default ({ page }) => {
  const { contentRepo }  = getCloudflareDocsConfig()
  const { modifiedTime, relativePath } = page.parent

  const editOnGithubURL = `https://github.com/${contentRepo}/blob/master/src/content/${relativePath}`

  return (
    <footer className="DocsFooter">
      <div className="DocsFooter--content">
        <div>
          {/* TODO - refactor .DocsMarkdown--link */}
          <a className="DocsMarkdown--link" href={editOnGithubURL}>
            Edit on Github
          </a>

          {" "}&nbsp; · &nbsp;{" "}

          Last updated{" "}
          <TimeAgo date={modifiedTime} minPeriod={60}/>
        </div>
      </div>
    </footer>
  )
}
