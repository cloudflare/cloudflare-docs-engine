import React from 'react'
import { Link } from "gatsby"

class DocsSidebarNavItem extends React.Component {

  constructor(props) {
    super(props)

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

  isExpanded() {
    const active = this.isActive()
    const activeRoot = this.isActiveRoot()
    return !!(this.props.node.children && (active || activeRoot))
  }

  onChildExpandedChange() {
    // TODO
    console.log('onChildExpandedChange', this.props.node.href)
  }

  getExpandCollapseHeight() {
    const el = this.expandCollapseEl.current
    const height = !el ? 'auto' : el.firstElementChild.clientHeight
    return { style: { height }}
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
    if (this.isActive()) linkProps['is-active'] = ''

    return (
      <li
        className="DocsSidebar--nav-item"
        key={node.id}
        {...props}
      >
        {Array.isArray(node.children) && (
          <button onClick={this.onExpandCollapseClick.bind(this)} className="Button DocsSidebar--nav-expand-collapse-button">
            <span className="DocsSidebar--nav-expand-collapse-button-content"></span>
          </button>
        )}

        <Link className="DocsSidebar--nav-link DocsSidebar--link" to={node.href} {...linkProps}>
          <span className="DocsSidebar--nav-link-highlight"></span>
          <span className="DocsSidebar--nav-link-text">{node.title}</span>
        </Link>

        {Array.isArray(node.children) && (
          <div
            className="DocsSidebar--nav-item-collapse-wrapper"
            ref={this.expandCollapseEl}
            { ...(expanded && this.getExpandCollapseHeight())}
          >
            <ul className="DocsSidebar--nav-subnav" depth={depth} style={{'--depth': depth}}>
              {node.children.map(node => (
                <DocsSidebarNavItem
                  key={node.id}
                  node={node}
                  location={location}
                  depth={depth}
                />
              ))}
            </ul>
          </div>
        )}
      </li>
    )
  }
}

export default DocsSidebarNavItem
