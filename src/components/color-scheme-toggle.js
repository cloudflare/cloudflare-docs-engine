import React from "react"

class ColorSchemeToggle extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checked: false // TODO
    }
  }

  onChange() {
    const checked = !this.state.checked
    this.setState({ checked })

    const theme = checked ? "dark" : "light"
    document.documentElement.setAttribute("theme", theme) // TODO
  }

  render() {
    return (
      <div className="ColorSchemeToggle">
        <input
          type="checkbox"
          id="ColorSchemeToggle"
          className="ColorSchemeToggle--input"
          onChange={this.onChange.bind(this)}
          checked={this.state.checked} />

        <label className="ColorSchemeToggle--toggle" htmlFor="ColorSchemeToggle">
          <div className="ColorSchemeToggle--toggle-handle"></div>
          <div className="ColorSchemeToggle--toggle-handle-icon ColorSchemeToggle--sun">
            <svg id="SunIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" fill="currentColor">
              <defs>
                <title>Sun icon</title>
              </defs>
              <path d="M7.5 11.465a3.482 3.482 0 01-1.596-.662L4.11 12.596a.5.5 0 01-.707-.707l1.793-1.793A3.482 3.482 0 014.535 8.5H2a.5.5 0 010-1h2.535a3.482 3.482 0 01.662-1.596L3.404 4.11a.5.5 0 01.707-.707l1.793 1.793A3.482 3.482 0 017.5 4.535V2a.5.5 0 011 0v2.535a3.482 3.482 0 011.596.662l1.793-1.793a.5.5 0 01.707.707l-1.793 1.793c.343.458.577 1.003.662 1.596H14a.5.5 0 110 1h-2.535a3.482 3.482 0 01-.662 1.596l1.793 1.793a.5.5 0 01-.707.707l-1.793-1.793a3.482 3.482 0 01-1.596.662V14a.5.5 0 11-1 0v-2.535z"/>
            </svg>
          </div>
          <div className="ColorSchemeToggle--toggle-handle-icon ColorSchemeToggle--moon">
            <svg id="MoonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" fill="currentColor">
              <defs>
                <title>Moon icon</title>
              </defs>
              <path d="M7.067 3.087a5 5 0 005.466 7.026 5 5 0 11-5.466-7.026z"/>
            </svg>
          </div>
        </label>
      </div>
    )
  }
}

export default ColorSchemeToggle
