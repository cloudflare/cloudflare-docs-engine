import React from "react"
import PropTypes from "prop-types"

import getUniqueReadableID from "../utils/get-unique-readable-id"

const AccessibleSVG = (props) => {
  const titleID = getUniqueReadableID("title")

  const { className, viewBox, fill, role, title } = props
  const svgProps = { className, viewBox, fill, role }

  return (
    <svg {...svgProps} aria-labelledby={titleID} xmlns="http://www.w3.org/2000/svg">
      <title id={titleID}>{title}</title>
      {props.children}
    </svg>
  )
}

AccessibleSVG.defaultProps = {
  fill: "currentColor",
  role: "img"
}

AccessibleSVG.propTypes = {
  title: PropTypes.string.isRequired
}

export default AccessibleSVG
