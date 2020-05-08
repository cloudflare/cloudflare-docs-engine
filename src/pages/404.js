import React from "react"

import { Link } from "gatsby"
import SEO from "../components/seo"

import DocsTitle from "../components/docs-title"

const NotFoundPage = () => (
  <>
    <SEO title="Not found"/>
    <h1>Not found</h1>
    <p>Unfortunately, the page you requested cannot be found.</p>
    <p><Link to="/">Go to <DocsTitle/> docs home</Link></p>
  </>
)

export default NotFoundPage
