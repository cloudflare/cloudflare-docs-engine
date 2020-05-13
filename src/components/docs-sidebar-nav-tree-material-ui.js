import React from 'react'
import { Location } from '@reach/router'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import { Link } from "gatsby"


const data = [
  {
    title: "Welcome",
    href: "/welcome"
  },
  {
    title: "Tutorials",
    href: "/tutorials"
  },
  {
    title: "Examples",
    href: "/examples"
  },
  {
    title: "Reference",
    href: "/reference"
  }
]

const DocsSidebarNavTree = () => {
  const expandCollapseButton = (
    <button className="Button DocsSidebar--nav-expand-collapse-button">
      <span className="DocsSidebar--nav-expand-collapse-button-content"></span>
    </button>
  )

  const renderTree = (node) => (
    <TreeItem
      className="DocsSidebar--nav-item"
      key={node.href}
      nodeId={node.href}
      label={
        <Link className="DocsSidebar--nav-link DocsSidebar--link" to={node.href}>
          <span className="DocsSidebar--nav-link-highlight"></span>
          <span className="DocsSidebar--nav-link-text">{node.title}</span>
        </Link>
      }
     >
      {Array.isArray(node.children) ? node.children.map((childNode) => renderTree(childNode)) : null}
    </TreeItem>
  )

  return (
    <Location>
      {({ location }) => (
        <TreeView
          className="DocsSidebar--nav"
          defaultExpandIcon={expandCollapseButton}
          defaultCollapseIcon={expandCollapseButton}
          defaultExpanded={[location.pathname]}
        >
          {data.map((childNode) => renderTree(childNode))}
        </TreeView>
      )}
    </Location>
  )
}

export default DocsSidebarNavTree
