const docsConfig = require("./docs-config.js")

const isProduction = process.env.NODE_ENV === "production"

const siteMetadata = docsConfig.siteMetadata
siteMetadata.cloudflareDocs = {}
Array.from([
  "product",
  "pathPrefix",
  "productLogoPathD",
  "contentRepo",
  "externalLinks",
  "search",
]).forEach(prop => {
  siteMetadata.cloudflareDocs[prop] = docsConfig[prop]
})

// We exposed friendlier siteMetadata.url to Docs consumers but
// gatsby-plugin-sitemap requires `siteUrl` https://git.io/JUUxW
siteMetadata.siteUrl = siteMetadata.url
delete siteMetadata.url

module.exports = {
  // Deploy production site to the docs config pathPrefix
  // but keep local development done at the root due to:
  // https://github.com/gatsbyjs/gatsby/issues/16040
  pathPrefix: isProduction ? docsConfig.pathPrefix : "",
  siteMetadata: siteMetadata,

  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-eslint",
    "gatsby-plugin-no-sourcemaps",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-remove-trailing-slashes",

    // Sets page.updatedAt to the author time of last commit (https://git.io/JfPCj)
    "saber-plugin-git-modification-time",

    // Prevent nav from (un)mounting on page navigations (https://git.io/JfOKn)
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/docs-page.js")
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1382,
              disableBgImageOnAlpha: true
            },
          },
          // Copies linked files from Markdown to public directory (ie for gifs)
          `gatsby-remark-copy-linked-files`,
        ],
        remarkPlugins: [require("remark-slug")]
      }
    },
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        stylesProvider: {
          disableGeneration: true
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Cloudflare docs",
        short_name: "Docs",
        start_url: "/",
        background_color: "#f38020",
        theme_color: "#f38020",
        display: "minimal-ui",
        icon: "src/images/cloudflare-icon.png"
      }
    },
    // Consider enabling for PWA + offline functionality
    // https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
