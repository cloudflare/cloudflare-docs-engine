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


const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type.toLowerCase() === "mdx") {
    const value = createFilePath({ node, getNode }).replace(/(.+)(\/)$/, "$1")

    createNodeField({
      name: "slug",
      node,
      value
    })
  }
}


const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              type
              order
              hidden
              hideChildren
              breadcrumbs
            }
            headings(depth: h1) {
              value
              depth
            }
            tableOfContents
            parent {
              ... on File {
                modifiedTime(formatString: "YYYY-MM-DD")
                relativePath
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query')
  }

  const pages = result.data.allMdx.edges

  pages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/components/mdx-custom-renderer.js"),
      context: node
    })
  })
}

// TODO - implement `createSchemaCustomization`
// We should be adding a custom schema to make improve build performance
// and make the project more forgiving to work with.
// - Performance improvements come from GraphQL not having to do type
//   inference on frontmatter properties.
// - Without implementing type definitions, if a frontmatter propery
//   is excluded from all .md pages, the build will actually break.
//   This is not currently a problem as Workers docs uses all of the
//   possible frontmatter props. But when future products use these
//   docs, they may not need to use a prop. They shouldn’t be penalized
//   (read: having their build break) for being minimalist or removing
//   unused code.
// https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
// exports.createSchemaCustomization = ({ actions }) => {}
