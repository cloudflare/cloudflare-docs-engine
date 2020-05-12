import React from "react"
import { useStaticQuery, graphql } from "gatsby"

class Dropdown extends React.Component {

  constructor(props) {
    super(props)

    this.ref = React.createRef()

    this.state = {
      expanded: false
    }
  }

  onExpandButtonClick() {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }

  handleClickOutside(event) {
    if (this.state.expanded && this.ref.current && !this.ref.current.contains(event.target)) {
      this.setState({
        expanded: false
      })
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside.bind(this))
  }

  render() {
    const { expanded } = this.state

    let { className, buttonClassName } = this.props
    className += (className ? " " : "") + "Dropdown"
    buttonClassName += (className ? " " : "") + "Button"

    return (
      <div className={className} ref={this.ref} data-expanded={expanded}>
        <button
          className={buttonClassName}
          onClick={this.onExpandButtonClick.bind(this)}
          aria-expanded={expanded}
          children={this.props.buttonChildren}
        />

        {this.props.children(this.state)}
      </div>
    )
  }
}

export default Dropdown
