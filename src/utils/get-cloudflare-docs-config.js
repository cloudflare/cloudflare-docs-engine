import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { site: { siteMetadata }} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            cloudflareDocs {
              product
              productLogoPathD
              contentRepo
              externalLinks {
                title
                url
              }
            }
          }
        }
      }
    `
  )

  return siteMetadata.cloudflareDocs
}
