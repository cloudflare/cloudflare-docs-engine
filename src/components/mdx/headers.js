import React from "react"

const header = (TagName) => (props => {
  const href = `#${ props.id }`

  return (
    <TagName id={props.id}>
      <span className="DocsMarkdown--header-anchor-positioner">
        <a className="DocsMarkdown--header-anchor Link Link-without-underline" href={href} aria-hidden="true">&#8203;</a>
      </span>
      <span>{props.children}</span>
    </TagName>
  )
})

export default {
  h2: header('h2'),
  h3: header('h3'),
  h4: header('h4'),
  h5: header('h5'),
  h6: header('h6'),
}
