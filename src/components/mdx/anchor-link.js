import React from "react"
import { Link } from "gatsby"

const linkClassName = "DocsMarkdown--link" // TODO - get prefix from somewhere

export default ({ href, className, ...props }) => {
  const external = !!href.match(/^https?:/)

  return external ? (
    <a href={href} className={className || linkClassName} {...props}/>
  ) : (
    <Link to={href} className={className || linkClassName} {...props}/>
  )
}
