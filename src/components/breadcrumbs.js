import React from "react"
import { Location } from "@reach/router"
import { Link, useStaticQuery, graphql } from "gatsby"

import getBreadcrumbs from "../utils/get-breadcrumbs"

const Item = ({ item }) => (
  <li className="Breadcrumbs--item" key={item.url}>
    <Link className="Link Link-without-underline Link-is-juicy" to={item.url}>
      {item.title}
    </Link>

    {Array.isArray(item.items) && (
      <ul>
        {item.items.map(item => (
          <Item key={item.url} item={item}/>
        ))}
      </ul>
    )}
  </li>
)

const Breadcrumbs = () => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            id
            parent {
              id
            }
            fields {
              slug
            }
            frontmatter {
              title
            }
            headings(depth: h1) {
              value
              depth
            }
          }
        }
      }
    }
  `)

  const pages = query.allMdx.edges
    .map(({ node }) => node)

  return (
    <Location>
      {({ location }) => (
        <ul className="Breadcrumbs">
          {getBreadcrumbs(pages, location).map(item => (
            <Item key={item.url} item={item}/>
          ))}
        </ul>
      )}
    </Location>
  )
}

export default Breadcrumbs
