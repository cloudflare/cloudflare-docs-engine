import React from "react"

import Highlight, { defaultProps } from "prism-react-renderer"

const CodeBlock = props => {
  const { className, children } = props.children.props
  const language = className ? className.split("-")[1] : "js"
  let code = children.trim()

  const tokenProps = ({ children, className, key }) => {
    className = "CodeBlock--" + className.split(" ")[1]

    return {
      key,
      children,
      className
    }
  }

  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className="CodeBlock CodeBlock-with-rows CodeBlock-is-light-in-light-theme CodeBlock-scrolls-horizontally">
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
