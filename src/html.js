import React from "react"
import PropTypes from "prop-types"

const manageTheme = `
  (() => {
    const setTheme = theme => {
      document.documentElement.setAttribute("theme", theme)
      localStorage.theme = theme
    }

    document.documentElement.addEventListener("dblclick", event => {
      if (event.target.closest('a, button, label, summary, [tabindex="0"], input, textarea')) return
      const theme = document.documentElement.getAttribute("theme")
      setTheme(theme === "dark" ? "light" : "dark")
    })

    const query = window.matchMedia("(prefers-color-scheme: dark)")
    query.addListener(() => {
      setTheme(query.matches ? "dark" : "light")
    })

    if (["dark", "light"].includes(localStorage.theme)) {
      setTheme(localStorage.theme)
    } else {
      setTheme(query.matches ? "dark" : "light")
    }
  })()
`

export default function HTML(props) {
  return (
    <html { ...props.htmlAttributes } theme="light" is-docs-page="" is-smooth-scrolling="" with-styled-webkit-scrollbars="">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        { props.headComponents }
        <script dangerouslySetInnerHTML={{ __html: manageTheme }} />
      </head>

      <body { ...props.bodyAttributes }>
        { props.preBodyComponents }

        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>

        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }}/>

        { props.postBodyComponents }
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
