import React from "react"

import { navigate, globalHistory } from "@reach/router"

import userPrefersReducedMotion from "../utils/user-prefers-reduced-motion"

class Item extends React.Component {

  constructor(props) {
    super(props)

    this.handleLinkClick = this.handleLinkClick.bind(this)
  }

  handleLinkClick(event) {
    // If we don’t handle this click, then the page
    // will hard refresh for the "↑ Top" item, and
    // if we use <Link/>, @reach throws an error:
    // https://github.com/reach/router/issues/114
    event.preventDefault()
    navigate(event.target.href)
  }

  render() {
    const { item } = this.props

    return (
      <li key={item.url}>
        <a className="DocsTableOfContents-link" href={item.url} onClick={this.handleLinkClick}>
          {item.title}
        </a>

        {Array.isArray(item.items) && (
          <ul>
            {item.items.map(item => (
              <Item key={item.url} item={item}/>
            ))}
          </ul>
        )}
      </li>
    )
  }
}

const DocsTableOfContents = ({ items }) => {
  const toTop = {
    url: "",
    title: "↑ Top"
  }

  return items.length ? (
    <ul className="DocsTableOfContents">
      <Item item={toTop}/>

      {items.map(item => (
        <Item key={item.url} item={item}/>
      ))}
    </ul>
  ) : (<></>)
}

export default DocsTableOfContents
