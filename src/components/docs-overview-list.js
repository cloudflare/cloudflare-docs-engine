import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import getParentPath from "../utils/get-parent-path"
import getPageTitle from "../utils/get-page-title"
import getOrder from "../utils/get-order"

// TODO - make this a global MDX component so it’s
// always available and give it a more generic name

const DocsOverviewList = props => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              order
              hidden
            }
            headings(depth: h1) {
              value
            }
          }
        }
      }
    }
  `)

  const pages = query.allMdx.edges
    .map(({ node }) => node)
    .filter(page => !page.frontmatter.hidden)
    .filter(page => getParentPath(page.fields.slug) === props.parentPath)
    .map(page => ({
      title: getPageTitle(page),
      url: page.fields.slug,
      order: getOrder(page),
    }))
    .sort((a, b) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
    .sort((a, b) => a.order - b.order)

  // TODO - render out a tree here rather than a flat list
  return (
    <ul>
      {pages.map(page => (
        <li key={page.url}>
          {/* TODO - get class name from somewhere */}
          <Link className="DocsMarkdown--link" to={page.url}>
            {page.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default DocsOverviewList
