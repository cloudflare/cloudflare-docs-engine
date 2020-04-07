/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// https://www.gatsbyjs.org/docs/add-custom-webpack-config/
exports.onCreateWebpackConfig = ({
  getConfig,
  actions,
  plugins,
}) => {
  const config = getConfig()

  // Hides "[HMR] ..." logs in devtools
  config.entry.commons = config.entry.commons.map(path => (
    path.indexOf('/webpack-hot-middleware/client.js?') !== -1 ?
      path : path + '&quiet=true'
  ))

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
