import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import createFocusGroup from "focus-group"

class Dropdown extends React.Component {

  constructor(props) {
    super(props)

    this.container = React.createRef()
    this.button = React.createRef()

    this.state = {
      expanded: false
    }

    this.onExpandButtonClick = this.onExpandButtonClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleEscapeKey = this.handleEscapeKey.bind(this)
  }

  onExpandButtonClick() {
    this.setState(state => {
      const expanded = !state.expanded

      if (expanded) {
        this.focusGroup.focusNodeAtIndex(0)
      }

      return { expanded }
    })
  }

  handleClickOutside(event) {
    if (this.state.expanded && this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        expanded: false
      })
    }
  }

  handleEscapeKey(event) {
    if (event.key !== "Escape") return

    if (this.button.current) {
      this.button.current.focus()
    }

    this.setState({ expanded: false })
  }

  componentDidMount() {
    const el = this.container.current
    const members = el.querySelectorAll(this.props.focusGroupSelector)

    this.focusGroup = createFocusGroup({
      members: members,
      wrap: true,
      stringSearch: true,
      keybindings: {
        next: [{ keyCode: 40 }, { keyCode: 39 }],
        prev: [{ keyCode: 38 }, { keyCode: 37 }],
        first: { keyCode: 74, metaKey: true },
        last: { keyCode: 75, metaKey: true }
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.expanded && this.state.expanded) {
      this.focusGroup.activate()
      document.addEventListener("click", this.handleClickOutside)
      document.addEventListener("keyup", this.handleEscapeKey)
    }

    if (prevState.expanded && !this.state.expanded) {
      this.focusGroup.deactivate()
      document.removeEventListener("click", this.handleClickOutside)
      document.removeEventListener("keyup", this.handleEscapeKey)
    }
  }

  componentWillUnmount() {
    this.focusGroup.deactivate()
  }

  render() {
    const { expanded } = this.state

    let { className, buttonClassName } = this.props
    className += (className ? " " : "") + "Dropdown"
    buttonClassName += (className ? " " : "") + "Button"

    return (
      <div className={className} ref={this.container} data-expanded={expanded}>
        <button
          ref={this.button}
          className={buttonClassName}
          onClick={this.onExpandButtonClick}
          aria-expanded={expanded}
          children={this.props.buttonChildren}
        />

        {this.props.children(this.state)}
      </div>
    )
  }
}

Dropdown.defaultProps = {
  focusGroupSelector: "a[href]"
}

export default Dropdown
