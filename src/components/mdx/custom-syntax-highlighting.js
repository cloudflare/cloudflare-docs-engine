export const languageMappings = {
  "bash": "sh",
  "shell": "sh",
  "javascript": "js",
  "markup": "html"
}

const transformations = {
  js: {
    keyword: {
      to: "declaration-keyword",
      for: ["const", "let", "var", "async", "await", "function", "class"]
    },
    punctuation: {
      to: "operator",
      for: ["."]
    },
    "class-name": {
      to: "api",
      for: ["HTMLRewriter", "Request", "Response", "URL", "Error"]
    },
    "function": {
      to: "builtin",
      for: ["fetch", "console", "addEventListener", "atob", "btoa", "setInterval", "clearInterval", "setTimeout", "clearTimeout"]
    }
  }
}

transformations.html = {
  keyword: transformations.js.keyword
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
