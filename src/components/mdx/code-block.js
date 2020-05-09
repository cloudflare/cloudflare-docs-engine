import React from "react"

import Highlight, { defaultProps } from "prism-react-renderer"

const transformations = {
  js: {
    keyword: {
      to: "declaration-keyword",
      for: ["const", "let", "var", "async", "function", "class"]
    },
    punctuation: {
      to: "operator",
      for: ["."]
    },
    "class-name": {
      to: "api",
      for: ["HTMLRewriter", "Request", "Response", "URL", "Error"] // TODO - only applies these to Workers-specific JavaScript blocks
    },
    "function": {
      to: "built-in",
      for: ["fetch", "console"]
    }
  },
  css: {
    selector: {
      to: "operator",
      for: ["="]
    },
    "*": {
      to: "string",
      for: (s) => s.match(/^".+"$/)
    }
  }
}

const transformToken = ({ token, children, language }) => {
  const lang = transformations[language]
  if (!lang) return token

  const trans = transformations[language][token]
  if (!trans) return token

  if (trans.for.includes(children)) {
    return trans.to
  }

  const any = transformations[language]["*"]
  if (any && any.for(children)) return any.to

  return token
}

const CodeBlock = props => {
  const { className, children } = props.children.props
  const language = className ? className.split("-")[1] : "js"
  let code = children.trim()

  const tokenProps = ({ children, className, key }) => {
    let token = className.split(" ")[1]
    token = transformToken({ token, children, language })
    className = "CodeBlock--" + token

    return {
      key,
      children,
      className
    }
  }

  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={"CodeBlock CodeBlock-with-rows CodeBlock-is-light-in-light-theme CodeBlock-scrolls-horizontally"} language={language}>
          <code>
            <span className="CodeBlock--line-number-rows" style={{display:"none"}}> {/* TODO - optionally display line numbers */}
              {tokens.map((line, i) => (
                <span className="CodeBlock--line-number-row" data-line-number={i + 1} key={i}></span>
              ))}
            </span>

            <span className="CodeBlock--rows">
              {tokens.map((line, i) => (
                <span className="CodeBlock--row" data-line-number={i + 1} key={i}>
                  <span className="CodeBlock--row-indicator"></span>
                  <span className="CodeBlock--row-content">
                    {line.map((token, key) => (
                      <span key={key} {...tokenProps(getTokenProps({ token, key }))} />
                    ))}
                  </span>
                </span>
              ))}
            </span>
          </code>
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
