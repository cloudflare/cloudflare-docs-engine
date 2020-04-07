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
