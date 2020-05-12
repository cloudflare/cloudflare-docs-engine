export const languageMappings = {
  "bash": "sh",
  "shell": "sh",
  "javascript": "js"
}

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
      for: ["fetch", "console", "addEventListener"]
    }
    // TODO - plain => CodeBlock--object-property
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

export const transformToken = ({ token, children, language }) => {
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
