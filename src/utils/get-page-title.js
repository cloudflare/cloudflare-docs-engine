export default page => {
  return page.frontmatter.title || (page.headings.length && page.headings[0].value)
}
