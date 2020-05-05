export default page => {
  return (!page || !page.frontmatter) ? "Not found" :
    page.frontmatter.title || (page.headings.length && page.headings[0].value)
}
