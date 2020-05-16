import React from 'react'
import { Link } from "gatsby"

import Collapse from "@material-ui/core/Collapse"

import getNormalizedPath from "../utils/get-normalized-path"

class DocsSidebarNavItem extends React.Component {

  constructor(props) {
    super(props)

    this.props.location.pathname = getNormalizedPath(this.props.location.pathname)
    this.expandCollapseEl = React.createRef()

    this.state = {
      expanded: this.isExpanded()
    }
  }

  isActive() {
    const { node, location } = this.props

    return node.href === location.pathname
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
    if (typeof this.props.isParentExpanded === "function") {
      const isParentExpanded = this.props.isParentExpanded()
      if (!isParentExpanded) return true
    }

    return false
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
        {Array.isArray(node.children) && (
          <button onClick={this.onExpandCollapseClick.bind(this)} className="Button DocsSidebar--nav-expand-collapse-button" {...buttonProps}>
            <span className="DocsSidebar--nav-expand-collapse-button-content"></span>
          </button>
        )}

        <Link className="DocsSidebar--nav-link DocsSidebar--link" to={node.href} {...linkProps}>
          <span className="DocsSidebar--nav-link-highlight"></span>
          <span className="DocsSidebar--nav-link-text">{node.title}</span>
        </Link>

        {Array.isArray(node.children) && (
          <Collapse in={expanded} timeout={400}>
            <div className="DocsSidebar--nav-item-collapse-content">
              <ul className="DocsSidebar--nav-subnav" depth={depth} style={{'--depth': depth}}>
                {node.children.map(node => (
                  <DocsSidebarNavItem
                    key={node.id}
                    node={node}
                    location={location}
                    depth={depth}
                    isParentExpanded={this.isExpanded.bind(this)}
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
