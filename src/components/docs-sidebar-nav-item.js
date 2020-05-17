import React from 'react'
import { Link } from "gatsby"

import Collapse from "@material-ui/core/Collapse"

import getNormalizedPath from "../utils/get-normalized-path"

const collapseClasses = {
  container: "DocsSidebar--nav-item-collapse-container",
  entered: "DocsSidebar--nav-item-collapse-entered",
  hidden: "DocsSidebar--nav-item-collapse-hidden",
  wrapper: "DocsSidebar--nav-item-collapse-wrapper",
  wrapperInner: "DocsSidebar--nav-item-collapse-wrapperInner"
}

class DocsSidebarNavItem extends React.Component {

  constructor(props) {
    super(props)

    this.props.location.pathname = getNormalizedPath(this.props.location.pathname)
    this.expandCollapseEl = React.createRef()

    this.state = {
      expanded: this.isExpanded()
    }
  }

  showChildren() {
    const { node } = this.props
    return Array.isArray(node.children) && !node.frontmatter.hideChildren
  }

  isActive() {
    const { node, location } = this.props

    const isActive = node.href === location.pathname
    const isActiveDueToChild = !this.showChildren() && this.isActiveRoot()

    return isActive || isActiveDueToChild
  }

  isActiveRoot() {
    const { node, location } = this.props

    const isActive = node => node.href === location.pathname
    const hasActiveChild = node => !node.children ? false : node.children.some(
      node => isActive(node) || hasActiveChild(node)
    )

    return hasActiveChild(node)
  }

  isHidden() {
    if (typeof this.props.isParentExpanded === "undefined") return false
    return !this.props.isParentExpanded
  }

  isExpanded() {
    const active = this.isActive()
    const activeRoot = this.isActiveRoot()
    return !!(this.props.node.children && (active || activeRoot))
  }

  componentDidMount() {
    const el = this.expandCollapseEl.current
    const expanded = this.state.expanded

    if (!el || !expanded) return

    el.style.height = el.firstElementChild.clientHeight + 'px'
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ expanded: this.isExpanded() })
    }
  }

  onExpandCollapseClick() {
    const expanded = this.state.expanded
    this.setState({ expanded: !expanded })
  }

  render() {
    const { expanded } = this.state
    const { node, location } = this.props
    const depth = this.props.depth + 1

    const props = {}
    if (expanded) props['is-expanded'] = ''
    if (this.isActive()) props['is-active'] = ''
    if (this.isActiveRoot()) props['is-active-root'] = ''

    const linkProps = {}
    if (this.isHidden()) linkProps.tabIndex = -1
    if (this.isHidden()) linkProps["aria-hidden"] = true
    if (this.isActive()) linkProps['is-active'] = ''

    const buttonProps = {}
    if (this.isHidden()) buttonProps.tabIndex = -1
    if (this.isHidden()) buttonProps["aria-hidden"] = true

    return (
      <li
        className="DocsSidebar--nav-item"
        key={node.id}
        {...props}
      >
        {this.showChildren() && (
          <button onClick={this.onExpandCollapseClick.bind(this)} className="Button DocsSidebar--nav-expand-collapse-button" {...buttonProps}>
            <span className="DocsSidebar--nav-expand-collapse-button-content"></span>
          </button>
        )}

        <Link className="DocsSidebar--nav-link DocsSidebar--link" to={node.href} {...linkProps}>
          <span className="DocsSidebar--nav-link-highlight"></span>
          <span className="DocsSidebar--nav-link-text">{node.title}</span>
        </Link>

        {this.showChildren() && (
          <Collapse classes={collapseClasses} in={expanded} timeout={400}>
            <div className="DocsSidebar--nav-item-collapse-content">
              <ul className="DocsSidebar--nav-subnav" depth={depth} style={{'--depth': depth}}>
                {node.children.map(node => (
                  <DocsSidebarNavItem
                    key={node.id}
                    node={node}
                    location={location}
                    depth={depth}
                    isParentExpanded={expanded}
                  />
                ))}
              </ul>
            </div>
          </Collapse>
        )}
      </li>
    )
  }
}

export default DocsSidebarNavItem
