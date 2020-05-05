import React from "react"

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

const DocsTableOfContents = ({ items }) => {
  const toTop = {
    url: "", // TODO
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
