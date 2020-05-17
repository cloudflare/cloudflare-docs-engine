import React from "react"
import { Link } from "gatsby"

export default ({ href, ...props }) => {
  const external = !!href.match(/^https?:/)

  return external ? (
    <a href={href} {...props}/>
  ) : (
    <Link to={href} {...props}/>
  )
}
