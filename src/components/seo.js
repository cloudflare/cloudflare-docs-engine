import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ lang, title, description, meta }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet titleTemplate={`%s · ${site.siteMetadata.title}`}>
      <html lang={lang}/>

      <title>{title}</title>

      <meta name="description" content={metaDescription}/>

      <meta property="og:title" content={title}/>
      <meta property="og:description" content={metaDescription}/>
      <meta property="og:type" content="website"/>

      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={metaDescription}/>
      <meta name="twitter:creator" content={site.siteMetadata.author}/>
      <meta name="twitter:card" content="summary_large_image"/>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  description: ""
}

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object)
}

export default SEO
