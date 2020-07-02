import React from "react"

import AnchorLink from "./mdx/anchor-link"
import CodeBlock from "./code-block"

const WorkerStarter = props => {
  const { title, description, repo } = props
  const repoLink = `https://github.com/${repo}`
  const command = `wrangler generate my-worker ${repoLink}`

  return (
    <div className="WorkerStarter">
      <div className="WorkerStarter--title">
        <AnchorLink className="Link" href={repoLink}>{title}</AnchorLink>
      </div>
      <div className="WorkerStarter--description">{description}</div>
      <div className="WorkerStarter--command">
        <CodeBlock lang="sh">{command}</CodeBlock>
      </div>
    </div>
  )
}

export default WorkerStarter
