import React from "react"

import Highlight, { defaultProps } from "prism-react-renderer"

import { transformToken, languageMappings, shellLanguages } from "./custom-syntax-highlighting"

const addNewlineToEmptyLine = line => {
  if (line && line.length === 1 && line[0].empty) {
    // Improves copy/paste behavior
    line[0].content = "\n"
  }

  return line
}

const getCodeBlockClassName = language => {
  const base = "CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally"
  return base + (language === "sh" ? "" : " CodeBlock-is-light-in-light-theme") // TODO
}

const CodeBlock = props => {
  const { className, children } = props.children.props

  let language = className ? className.split("-")[1] : "js"
  const mappedLanguage = languageMappings[language]
  if (mappedLanguage) language = mappedLanguage

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
        <pre className={getCodeBlockClassName(language)} language={language}>
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
