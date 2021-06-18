import React from "react"

import { navigate } from "@reach/router"

class Item extends React.Component {

  constructor(props) {
    super(props)
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
