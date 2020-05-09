import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import TimeAgo from "react-timeago"

import getPageTitle from "../utils/get-page-title"

const oneWeekInMS = 7 * 24 * 60 * 60 * 1000

const DocsTutorials = () => {
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
              updated
              difficulty
              length
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

  const tutorials = query.allMdx.edges
    .map(({ node }) => node)
    .filter(page => page.fields.slug.match(/^\/tutorials\/.+/))
    .map(page => ({
      title: getPageTitle(page),
      url: page.fields.slug,
      updated: page.frontmatter.updated,
      difficulty: page.frontmatter.difficulty,
      length: page.frontmatter.length,
      new: (+new Date - +new Date(page.frontmatter.updated)) < oneWeekInMS
    }))
    .sort((a, b) => +new Date(b.updated) - +new Date(a.updated))

  return (
    <div className="DocsTutorials">
      <div className="DocsTutorials--item DocsTutorials--item-header">
        <div className="DocsTutorials--item-name">
          <span className="DocsTutorials--item-header-text">Name</span>
        </div>
        <div className="DocsTutorials--item-updated">
          <span className="DocsTutorials--item-header-text">Updated</span>
        </div>
        <div className="DocsTutorials--item-difficulty">
          <span className="DocsTutorials--item-header-text">Difficulty</span>
        </div>
        <div className="DocsTutorials--item-length">
          <span className="DocsTutorials--item-header-text">Length</span>
        </div>
      </div>

      {tutorials.map(tutorial => (
        <div key={tutorial.url} className={"DocsTutorials--item" + (tutorial.new ? " DocsTutorials--item-is-new" : "")}>
          <div className="DocsTutorials--item-name">
            <Link className="DocsTutorials--item-link" to={tutorial.url}>
              {tutorial.title}
            </Link>
          </div>
          <div className="DocsTutorials--item-updated">
            <TimeAgo date={tutorial.updated} minPeriod={60}/>
          </div>
          <div className="DocsTutorials--item-difficulty">{tutorial.difficulty}</div>
          <div className="DocsTutorials--item-length">
            <div className="DocsTutorials--item-length-bar">
              <div className="DocsTutorials--item-length-bar-inner" style={{width: tutorial.length}}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DocsTutorials
