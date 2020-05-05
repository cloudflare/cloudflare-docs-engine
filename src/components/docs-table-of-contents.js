import React from 'react'
// import { Link } from "gatsby"

const Item = ({ item }) => {
  return (
    <li key={item.url}>
      <a className="DocsTableOfContents-link" href={item.url}>
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

const DocsTableOfContents = ({ data }) => {
  const items = data.items[0].items

  const toTop = {
    url: "",
    title: "↑ Top"
  }

  return (
    <ul className="DocsTableOfContents">
      <Item item={toTop}/>

      {items.map(item => (
        <Item key={item.url} item={item}/>
      ))}
    </ul>
  )
}

export default DocsTableOfContents
