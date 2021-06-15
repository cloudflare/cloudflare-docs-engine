import React from "react"

class Item extends React.Component {

  constructor(props) {
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
}

const DocsTableOfContents = ({ items }) => {
  const toTop = {
    // the top most div of content to scroll to 
    url: "#docs-content",
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
