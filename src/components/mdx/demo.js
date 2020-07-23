import React from "react"

import { className as generateClassName } from "./root"

const Demo = ({ src, height, aspectRatio }) => {
  const className = generateClassName("demo") + (aspectRatio ? " AspectRatio" : "")
  const iframeClassName = aspectRatio ? "AspectRatio--content" : ""

  const style = aspectRatio ? {
    "--aspect-ratio": `calc(${ aspectRatio })`
  } : {
    height: `${ height }px`
  }

  return (
    <div className={className} style={style}>
      <iframe className={iframeClassName} src={src} frameBorder="0"/>
    </div>
  )
}

Demo.defaultProps = {
  height: 400
}

export default Demo
