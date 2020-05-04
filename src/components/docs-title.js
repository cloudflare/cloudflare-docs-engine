// TODO - rename to docs-pruduct-title to make it more clear

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const DocsTitle = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            cloudflareDocs {
              product
            }
          }
        }
      }
    `
  )

  const title = site.siteMetadata.cloudflareDocs.product

  return (<>{title}</>)
}

export default DocsTitle
