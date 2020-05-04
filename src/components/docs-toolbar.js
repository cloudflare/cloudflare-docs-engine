import React from "react"

const DocsToolbar = () => (
  <div className="DocsToolbar">
    <div className="DocsToolbar--search">
      <div className="DocsSearch">
        <div className="DocsSearch--input-wrapper">
          <input className="DocsSearch--input" type="text" spellCheck="false" autoComplete="false" placeholder="Search Workers docs..."/>
          <div className="DocsSearch--input-icon">
            <svg id="SearchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" role="img" aria-labelledby="SearchIcon--title SearchIcon--desc" fill="currentColor">
              <defs>
                <title id="SearchIcon--title">Search icon</title>
                <desc id="SearchIcon--desc">A magnifying glass used to illustrate the concept of search.</desc>
              </defs>
              <path d="M11.999 10.585l3.458 3.458a1 1 0 01-1.414 1.414L10.585 12a6.5 6.5 0 111.414-1.414zM6.75 11.5a4.75 4.75 0 100-9.5 4.75 4.75 0 000 9.5z"/>
            </svg>
          </div>
          <div className="DocsSearch--input-bottom-border"></div>
        </div>
      </div>
    </div>

    <div className="DocsToolbar--tools">
      <div className="DocsToolbar--color-scheme-toggle">
        <div className="ColorSchemeToggle">
          <input className="ColorSchemeToggle--input" id="ColorSchemeToggle" type="checkbox"/>
          <script>ColorSchemeToggle.checked = document.documentElement.getAttribute('theme') === 'dark'</script>
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
      </div>
    </div>
  </div>
)

export default DocsToolbar
