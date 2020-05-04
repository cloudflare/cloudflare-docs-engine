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
    title: "Learning",
    href: "/learning",
    children: [
      { title: "How Workers works", href: "/learning/how-workers-works" },
      { title: "The Request context", href: "/learning/the-request-context" },
      { title: "FetchEvent lifecycle", href: "/learning/fetch-event-lifecycle" },
      { title: "Debugging", href: "/learning/debugging" },
      { title: "Routing", href: "/learning/routing" },
      { title: "Cloudflare Cache", href: "/learning/cloudflare-cache" },
      { title: "Security", href: "/learning/security" },
      { title: "Pricing", href: "/learning/pricing" },
      { title: "Limits", href: "/learning/limits" },
    ]
  },
  {
    title: "Reference",
    href: "/reference",
    children: [
      // TODO
      { title: "How Workers works", href: "/reference/how-workers-works" },
      { title: "The Request context", href: "/reference/the-request-context" },
      { title: "FetchEvent lifecycle", href: "/reference/fetch-event-lifecycle" },
      { title: "Debugging", href: "/reference/debugging" },
      { title: "Routing", href: "/reference/routing" },
      { title: "Cloudflare Cache", href: "/reference/cloudflare-cache" },
      { title: "Security", href: "/reference/security" },
      { title: "Pricing", href: "/reference/pricing" },
      { title: "Limits", href: "/reference/limits" },
    ]
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

  // return (
  //   <TreeView
  //     className={c}
  //     defaultCollapseIcon={<ExpandMoreIcon />}
  //     defaultExpandIcon={<ChevronRightIcon />}
  //   >
  //     <TreeItem className={c+"-item"} nodeId="1" label="Applications">
  //       <TreeItem className={c+"-item"} nodeId="2" label="Calendar" />
  //       <TreeItem className={c+"-item"} nodeId="3" label="Chrome" />
  //       <TreeItem className={c+"-item"} nodeId="4" label="Webstorm" />
  //     </TreeItem>
  //     <TreeItem className={c+"-item"} nodeId="5" label="Documents">
  //       <TreeItem className={c+"-item"} nodeId="10" label="OSS" />
  //       <TreeItem className={c+"-item"} nodeId="6" label="Material-UI">
  //         <TreeItem className={c+"-item"} nodeId="7" label="src">
  //           <TreeItem className={c+"-item"} nodeId="8" label="index.js" />
  //           <TreeItem className={c+"-item"} nodeId="9" label="tree-view.js" />
  //         </TreeItem>
  //       </TreeItem>
  //     </TreeItem>
  //   </TreeView>
  // )
}

export default DocsSidebarNavTree
