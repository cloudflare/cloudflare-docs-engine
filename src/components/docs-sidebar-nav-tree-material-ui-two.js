import React from "react"
import { Location } from "@reach/router"
import { Link, useStaticQuery, graphql } from "gatsby"

import PropTypes from "prop-types"
import SvgIcon from "@material-ui/core/SvgIcon"
import { fade, makeStyles, withStyles } from "@material-ui/core/styles"

import TreeView from "@material-ui/lab/TreeView"
import TreeItem from "@material-ui/lab/TreeItem"
import Collapse from "@material-ui/core/Collapse"

import Typography from '@material-ui/core/Typography'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import Label from '@material-ui/icons/Label'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import InfoIcon from '@material-ui/icons/Info'
import ForumIcon from '@material-ui/icons/Forum'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import { useSpring, animated } from "react-spring"

import getPageByPath from "../utils/get-page-by-path"
import getParentPath from "../utils/get-parent-path"
import generateNavTree from "../utils/generate-nav-tree"

let navTree
const getCachedNavTree = pages => {
  if (navTree) return navTree
  navTree = generateNavTree(pages)
  return navTree
}

// const expandCollapseButton = (
//   <button className="Button DocsSidebar--nav-expand-collapse-button">
//     <span className="DocsSidebar--nav-expand-collapse-button-content"></span>
//   </button>
// )

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  )
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  )
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(-20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : -20}px,0,0)` },
  })

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  )
}

TransitionComponent.propTypes = {
  /**
   * Show the component triggers the enter or exit states
   */
  in: PropTypes.bool,
}

const useTreeItemStyles = makeStyles({
  root: {
    "&:focus > $content": {
      boxShadow: "0 0 0 3px var(--focus-color)",
    },

    "&$selected > $content": {
      backgroundColor: "rgba(var(--gray-5-rgb), .2)",
      boxShadow: "inset .4125em 0 var(--orange)"
    },

    "&:hover > $linkSpan": {
      backgroundColor: "rgba(var(--gray-5-rgb), .2)",
    },

    "&$selected $label": {
      backgroundColor: "transparent",
    },

    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label, &$selected:hover > $content $label, &$selected:focus > $content $label": {
      background: "transparent",
    },
  },

  content: {
    color: "inherit",

    borderTopRightRadius: ".25em",
    borderBottomRightRadius: ".25em",
  },

  group: {
    marginLeft: 0,
    paddingLeft: 0,

    "& $content": {
      paddingLeft: "calc(var(--depth) * 1em)",
    },
  },

  expanded: {},

  selected: {
    background: "transparent",
  },

  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: 0,

    "&:hover, &$selected": {
      background: "transparent"
    }
  },

  labelIcon: {
    marginRight: ".75em",
  },

  label: {
    background: "transparent",
    paddingLeft: 0,

    "&:focus, &$selected, &:hover": {
      background: "transparent"
    }
  },

  link: {
    fontFamily: "var(--font-family)",
    color: "inherit",
    textDecoration: "none",
    letterSpacing: 0,
    width: "100%",
  },

  linkSpan: {
    display: "inline-flex",
    padding: ".25em .6em",
  },

  iconContainer: {
    padding: ".5em .5em .5em 1em",
    width: "auto",
    margin: 0
  },
})

function StyledTreeItem(props) {
  const classes = useTreeItemStyles()
  const { labelHref, labelText, depth, ...other } = props

  return (
    <TreeItem
      TransitionComponent={TransitionComponent}
      label={
        <div className={classes.labelRoot}>
          <Link className={classes.link} to={labelHref}>
            <span className={classes.linkSpan}>
              {labelText}
            </span>
          </Link>
        </div>
      }
      style={{
        "--depth": depth
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
        iconContainer: classes.iconContainer
      }}
      {...other}
    />
  )
}

const useStyles = makeStyles({
  root: {
    height: "auto",
    maxWidth: "calc(100% - 1em)",
    flexGrow: 1,
  },
})

const DocsSidebarNav = () => {
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState([])
  const [selected, setSelected] = React.useState([])

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
              children
              breadcrumbs
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

  const renderItem = (node, depth) => (
    <StyledTreeItem
      node={node}
      key={node.id}
      nodeId={node.id}
      location={location}
      labelText={node.title}
      labelHref={node.href}
      depth={depth}
     >
      {!Array.isArray(node.children) ? null : node.children.map(n => renderItem(n, depth + 1))}
    </StyledTreeItem>
  )

  const getSelected = path => {
    let page = getPageByPath(pages, path)

    const parentPath = getParentPath(path)
    if (!page && parentPath) return getSelected(getParentPath(parentPath))
    return [page.id]
  }

  const getExpanded = path => {
    let out = []

    try {
      const page = getPageByPath(pages, path)
      out.push(page.id)

      let parent = pages.find(p => p.id === page.parentId)
      while (parent) {
        out.push(parent.id)
        parent = pages.find(p => p.id === parent.parentId)
      }
    } catch (error) {}

    return out
  }

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds)
  }

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds)
  }

  return (
    <Location>
      {({ location }) => (
        <TreeView
          className={classes.root}
          selected={getSelected(location.pathname)}
          expanded={getExpanded(location.pathname)}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<div style={{width:14}}/>}
        >
          {data.map(n => renderItem(n, 0))}
        </TreeView>
      )}
    </Location>
  )
}

export default DocsSidebarNav
