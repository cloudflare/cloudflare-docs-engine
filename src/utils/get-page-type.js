export default page => {
  return (!page || !page.frontmatter) ? '' :
    page.frontmatter.type || "document"
}
