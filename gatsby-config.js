module.exports = {
  siteMetadata: {
    title: "Cloudflare Docs",
    description: "Documentation for Cloudflare products and services.",
    author: "@cloudflare",
    cloudflareDocs: {
      product: "Workers",
      productLogoPathD: "M13.112 9.832c.164-.276.362-.528.59-.75l3.71 6.508-4.02 7.054a3.742 3.742 0 000 3.712l4.02 7.056a14410.466 14410.466 0 00-3.705 6.511 3.648 3.648 0 01-.595-.755L5.495 26.3a3.517 3.517 0 010-3.6l7.617-12.868zM31.617 41h-5.354l8.346-14.644a3.742 3.742 0 000-3.712L26.263 8h5.354c1.355 0 2.602.702 3.27 1.832L42.506 22.7a3.517 3.517 0 010 3.6l-7.617 12.868c-.669 1.13-1.916 1.832-3.27 1.832zm-15.234 0c-.088 0-.176-.003-.263-.009l1.504-2.644c1.564-2.747 3.91-6.867 7.04-12.36a3 3 0 000-2.974L16.114 8.01c.089-.006.179-.009.269-.009h6.858l9.095 15.959c.193.338.193.744 0 1.082L23.24 41h-6.858z",
      contentRepo: "adamschwartz/workers-docs",
      externalLinks: [
        {
          title: "Workers home",
          url: "https://workers.cloudflare.com"
        },
        {
          title: "Playground",
          url: "https://cloudflareworkers.com"
        },
        {
          title: "Pricing",
          url: "https://workers.cloudflare.com/#plans"
        },
      ]
    },
  },

  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    // "gatsby-plugin-postcss",
    "gatsby-plugin-remove-trailing-slashes",
    // Prevent nav from (un)mounting on page navigations
    // https://git.io/JfOKn
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/docs-page.js")
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
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        remarkPlugins: [require("remark-slug")]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/gatsby-icon.png" // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
