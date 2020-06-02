import React from "react"

import { className } from "./root"
const matchRegExp = /^\{(.+)\}/

const getCustomBlockType = props => {
  const { children } = props

  let testChild

  if (!children.length) {
    testChild = children.props.children[0]

  } else {
    if (typeof children[0].props.children === "string") {
      testChild = children[0].props.children
    } else {
      testChild = children[0].props.children[0]
    }
  }

  if (typeof testChild !== "string") return false

  const match = testChild.trim().match(matchRegExp)

  if (match && match.length === 2) {
    return match[1]
  }

  return false
}

export const shouldUseCustomBlock = props => {
  return !!getCustomBlockType(props)
}

const CustomBlockHeader = props => (
  <div className={className("custom-block-header")}>
    {props.children}
  </div>
)

const getChildrenWithFirstChildLeafStripped = props => {
  const { children } = props
  const returnChildren = []

  if (!children.length) {
    children.props.children.forEach((child, i) => {
      if (i > 0) returnChildren.push(child)
    })

  } else if (children[0].props.mdxType === "p") {
    let firstChildChildren

    if (typeof children[0].props.children === "string") {
      firstChildChildren = children[0].props.children.replace(matchRegExp, "")

    } else {
      firstChildChildren = []
      children[0].props.children.forEach((child, i) => {
        if (i > 0) firstChildChildren.push(child)
      })
    }

    const firstChild = (<CustomBlockHeader key="0" children={firstChildChildren}/>)
    returnChildren.push(firstChild)

    children.forEach((child, i) => {
      if (i > 0) returnChildren.push(child)
    })

  } else {
    return props.children
  }

  return returnChildren
}

export const CustomBlock = props => {
  const type = getCustomBlockType(props)
  const children = getChildrenWithFirstChildLeafStripped(props)

  return (
    <div className={className("custom-block")} data-type={type}>
      {children}
    </div>
  )
}

export default CustomBlock
