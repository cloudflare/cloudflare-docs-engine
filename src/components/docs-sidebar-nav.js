import React from 'react'
import { Location } from '@reach/router'
import { useStaticQuery, graphql } from "gatsby"

import DocsSidebarNavItem from "./docs-sidebar-nav-item"

import generateNavTree from "../utils/generate-nav-tree"

let navTree
const getCachedNavTree = pages => {
  if (navTree) return navTree
  navTree = generateNavTree(pages)
  return navTree
}

const DocsSidebarNav = () => {
  const query = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              type
              order
              hidden
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
    .filter(page => !page.frontmatter.hidden)

  const data = getCachedNavTree(pages)

  return (
    <Location>
      {({ location }) => (
        <ul className="DocsSidebar--nav">
          {data.map((node) => (
            <DocsSidebarNavItem
              key={node.id}
              node={node}
              location={location}
              depth={0}
            />
          ))}
        </ul>
      )}
    </Location>
  )
}

export default DocsSidebarNav
