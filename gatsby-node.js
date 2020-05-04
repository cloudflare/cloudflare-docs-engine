// See: https://www.gatsbyjs.org/docs/node-apis/

// https://www.gatsbyjs.org/docs/add-custom-webpack-config/
exports.onCreateWebpackConfig = ({
  getConfig,
  actions,
  plugins,
}) => {
  const config = getConfig()

  // Hides "[HMR] ..." logs in devtools
  if (config.entry.commons) {
    config.entry.commons = config.entry.commons.map(path => (
      // Add query param to entry added by Gatsby CLI https://git.io/JvAC5
      path.indexOf('/webpack-hot-middleware/client.js?') > -1 ?
        path + '&quiet=true' : path
    ))
  }

  actions.replaceWebpackConfig(config)

  actions.setWebpackConfig({
    plugins: [
      // Hides React Devtools advertisement in devtools
      // https://tinyurl.com/hide-react-devtools-advert
      plugins.define({
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })"
      })
    ]
  })
}






// TODO
const getPath = filePath => {
  return filePath
    .split(/.*\/src\/pages/)[1]
    .split('.')[0]
    .replace(/index$/, '')
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const query = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
              type
              order
              hidden
            }
            fileAbsolutePath
            headings(depth: h1) {
              value
              depth
            }
          }
        }
      }
    }
  `)

  if (query.errors) throw query.errors

  query.data.allMdx.edges.forEach(({ node }) => {
    const {
      frontmatter: { pathname }
    } = node

    createPage({
      path: `/foobar${ getPath(node.fileAbsolutePath) }`,
      component: node.fileAbsolutePath,
      context: {
        id: node.id,
        headings: node.headings
      }
    })
  })
}
