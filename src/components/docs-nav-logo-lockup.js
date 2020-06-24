import React from "react"
import PropTypes from "prop-types"

const DocsNavLogoLockup = ({ logo, text, small }) => (
  <div className={
    "DocsNavLogoLockup" +
    (small ? " DocsNavLogoLockup-with-small-gap" : "")
   }>
    <div className="DocsNavLogoLockup--logo">
      {logo}
    </div>
    <span className="DocsNavLogoLockup--text">
      {text}
    </span>
  </div>
)

DocsNavLogoLockup.defaultProps = {
  small: false
}

export default DocsNavLogoLockup
