import React from "react"

import { shouldUseCustomBlock, CustomBlock } from "./custom-block"

const blockquote = props => {
  return (
    shouldUseCustomBlock(props) ? (
      <CustomBlock {...props}/>
    ) : (
      <blockquote {...props}/>
    )
  )
}

export default blockquote
