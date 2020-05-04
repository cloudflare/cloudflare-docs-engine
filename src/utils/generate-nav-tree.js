import getPageTitle from "./get-page-title"

const getPath = filePath => {
  return filePath
    .split(/.*\/src\/pages/)[1] // TODO
    .split('.')[0]
    .replace(/index$/, '') // TODO
}

const getParentPath = path => {
  return path.replace(/\/[^/]*$/, '')
}

const formatNode = (node) => {
  node.href = node.path
  node.title = getPageTitle(node)
  return node
}

const getOrder = (node) => {
  if (node.frontmatter.order || node.frontmatter.order === 0) {
    return node.frontmatter.order
  }

  return 10e6 // TODO
}

const generateNavTree = pages => {
  let totalDepth = 0
  const pagesByPath = {}

  pages.forEach((page, i) => {
    const path = getPath(page.fileAbsolutePath)
    pages[i].path = path
    pagesByPath[path] = page

    const depth = path.split('/').length - 2
    if (totalDepth < depth) totalDepth = depth
    pages[i].depth = depth
  })

  pages.forEach((page, i) => {
    const parentPath = getParentPath(page.path)
    if (!parentPath) return
    pages[i].parentId = pagesByPath[parentPath].id
  })

  pages.sort((a, b) => getOrder(a) - getOrder(b))

  const map = {}
  const tree = []

  for (let i = 0; i < pages.length; i += 1) {
    map[pages[i].id] = i
  }

  for (let i = 0; i < pages.length; i += 1) {
    const node = pages[i]
    if (node.depth > 0) {
      if (!pages[map[node.parentId]].children) pages[map[node.parentId]].children = []
      pages[map[node.parentId]].children.push(formatNode(node))
    } else {
      tree.push(formatNode(node))
    }
  }

  return tree
}

export default generateNavTree
