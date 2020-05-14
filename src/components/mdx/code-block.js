import React from "react"

import Highlight, { defaultProps } from "prism-react-renderer"

import { transformToken, languageMappings, shellLanguages } from "./custom-syntax-highlighting"

const codeBlockClassName = "CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme"

const addNewlineToEmptyLine = line => {
  if (line && line.length === 1 && line[0].empty) {
    // Improves copy/paste behavior
    line[0].content = "\n"
  }

  return line
}

const CodeBlock = props => {
  const { className, children } = props.children.props

  let language = className ? className.split("-")[1] : "js"
  const mappedLanguage = languageMappings[language]
  if (mappedLanguage) language = mappedLanguage

  let code = children.trim()

  const tokenProps = ({ children, className, key }) => {
    const tokens = className.replace("token ", "").split(" ")

    className = ""

    tokens.forEach((token, i) => {
      token = transformToken({ token, children, language })
      if (token.indexOf("language-") !== 0) token = `token-${ token }`
      className += ` CodeBlock--${ token }`
    })

    className = className.trim()

    return {
      key,
      children,
      className
    }
  }

  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={codeBlockClassName + " CodeBlock--language-" + language} language={language}>
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
                    {addNewlineToEmptyLine(line).map((token, key) => (
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
