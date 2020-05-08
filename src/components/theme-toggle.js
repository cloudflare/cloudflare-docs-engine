import React from "react"
import Helmet from "react-helmet"

import setIntervalVisible from "set-interval-visible"

const colorSchemeQuery = "(prefers-color-scheme: dark)"

const storeInterval = 30 * 1000
const storeExpiration = 30 * 60 * 1000

// Run theme initialization in the <head/> to avoid a flash
const getThemeFromStorageSource = `
  (() => {
    getThemeFromStorage = () => {
      let storedTheme

      const query = window.matchMedia("${ colorSchemeQuery }")
      const queryTheme = query.matches ? "dark" : "light"

      try {
        const theme = JSON.parse(localStorage.theme)
        const themeIsValid = ["dark", "light"].includes(theme.theme)
        const themeWasRecentlySet = theme.updated > +new Date - ${ storeExpiration }

        if (themeIsValid && themeWasRecentlySet) {
          storedTheme = theme.theme
        }
      } catch (error) {}

      return storedTheme || queryTheme
    }

    document.documentElement.setAttribute("theme", getThemeFromStorage())
  })()
`

const getThemeFromStorage = () => {
  let storedTheme

  const query = window.matchMedia(colorSchemeQuery)
  const queryTheme = query.matches ? "dark" : "light"

  try {
    const theme = JSON.parse(localStorage.theme)
    const themeIsValid = ["dark", "light"].includes(theme.theme)
    const themeWasRecentlySet = theme.updated > +new Date - storeExpiration

    if (themeIsValid && themeWasRecentlySet) {
      storedTheme = theme.theme
    }
  } catch (error) {}

  return storedTheme || queryTheme
}

const getTheme = () => {
  return document.documentElement.getAttribute("theme")
}

const setTheme = theme => {
  document.documentElement.setAttribute("theme", theme)
}

const onMediaMatchChange = event => {
  setTheme(event.matches ? "dark" : "light")
}

const storeTheme = theme => {
  localStorage.theme = JSON.stringify({
    theme: theme,
    updated: +new Date
  })
}


class ThemeToggle extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      checked: false
    }
  }

  componentDidMount() {
    const theme = getThemeFromStorage()
    const checked = theme === "dark"

    this.setState({ checked })

    this.query = window.matchMedia(colorSchemeQuery)
    this.query.addListener(onMediaMatchChange)

    this.interval = setIntervalVisible(() => {
      storeTheme(getTheme())
    }, storeInterval)
  }

  componentWillUnmount() {
    this.query.removeListener(colorSchemeQuery)
    this.interval.clear()
  }

  onChange() {
    const checked = !this.state.checked
    this.setState({ checked })

    const theme = checked ? "dark" : "light"
    setTheme(theme)
    storeTheme(theme)
  }

  render() {
    return (
      <>
        <Helmet>
          {/* Run theme initialization in the <head/> to avoid a flash */}
          <script>{ getThemeFromStorageSource }</script>
        </Helmet>

        <div className="ThemeToggle">
          <input
            type="checkbox"
            id="ThemeToggle"
            className="ThemeToggle--input"
            onChange={this.onChange.bind(this)}
            checked={this.state.checked} />

          <label className="ThemeToggle--toggle" htmlFor="ThemeToggle">
            <div className="ThemeToggle--toggle-handle"></div>
            <div className="ThemeToggle--toggle-handle-icon ThemeToggle--sun">
              <svg id="SunIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" fill="currentColor">
                <defs>
                  <title>Sun icon</title>
                </defs>
                <path d="M7.5 11.465a3.482 3.482 0 01-1.596-.662L4.11 12.596a.5.5 0 01-.707-.707l1.793-1.793A3.482 3.482 0 014.535 8.5H2a.5.5 0 010-1h2.535a3.482 3.482 0 01.662-1.596L3.404 4.11a.5.5 0 01.707-.707l1.793 1.793A3.482 3.482 0 017.5 4.535V2a.5.5 0 011 0v2.535a3.482 3.482 0 011.596.662l1.793-1.793a.5.5 0 01.707.707l-1.793 1.793c.343.458.577 1.003.662 1.596H14a.5.5 0 110 1h-2.535a3.482 3.482 0 01-.662 1.596l1.793 1.793a.5.5 0 01-.707.707l-1.793-1.793a3.482 3.482 0 01-1.596.662V14a.5.5 0 11-1 0v-2.535z"/>
              </svg>
            </div>
            <div className="ThemeToggle--toggle-handle-icon ThemeToggle--moon">
              <svg id="MoonIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" fill="currentColor">
                <defs>
                  <title>Moon icon</title>
                </defs>
                <path d="M7.067 3.087a5 5 0 005.466 7.026 5 5 0 11-5.466-7.026z"/>
              </svg>
            </div>
          </label>
        </div>
      </>
    )
  }
}

export default ThemeToggle
