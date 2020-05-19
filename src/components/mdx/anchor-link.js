import React from "react"
import { Link } from "gatsby"

const linkClassName = "DocsMarkdown--link" // TODO - get prefix from somewhere

export default ({ href, className, ...props }) => {
  const isExternal = !!href.match(/^https?:/)
  const isHash = href.indexOf("#") === 0

  const useRegularLink = isExternal || isHash

  return useRegularLink ? (
    <a href={href} className={className || linkClassName} {...props}/>
  ) : (
    <Link to={href} className={className || linkClassName} {...props}/>
  )
}
