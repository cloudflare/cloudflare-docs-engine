module.exports = {
  siteMetadata: {
    title: "Cloudflare Docs",
    description: "Documentation for Cloudflare products and services.",
    author: "@cloudflare",
    cloudflareDocs: {
      product: "Workers",
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
    // Prevent nav from (un)mounting on page navigations
    // https://git.io/JfOKn
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/docs-page.js")
      }
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
