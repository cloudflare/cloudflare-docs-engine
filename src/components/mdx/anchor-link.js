import React from "react"
import { Link } from "gatsby"

import { className } from "./root"
const linkClassName = className("link")
const contentClassName = `${ linkClassName }-content`
const externalIconClassName = `${linkClassName}-external-icon`

import ExternalLinkIcon from "../icons/external-link"

export default ({ href, className, children, ...props }) => {
  const isExternal = !!href.match(/^https?:/)
  const isHash = href.indexOf("#") === 0

  const useRegularLink = isExternal || isHash

  return useRegularLink ? (
    isExternal ? (
      <a href={href} className={className || linkClassName} {...props}>
        <span className={contentClassName}>{children}</span>
        <ExternalLinkIcon className={externalIconClassName}/>
      </a>
    ) : (
      <a href={href} className={className || linkClassName} {...props}>
        <span className={contentClassName}>{children}</span>
      </a>
    )
  ) : (
    <Link to={href} className={className || linkClassName} {...props}>
      <span className={contentClassName}>{children}</span>
    </Link>
  )
}
