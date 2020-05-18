export default node => {
  if (node.frontmatter && (node.frontmatter.order || node.frontmatter.order === 0)) {
    return node.frontmatter.order
  }

  // Avoid `Infinity` to be able to use simple
  // subtraction-based sort method
  return 10e6
}
