import React from "react"

import { Location } from "@reach/router"
import { TransitionGroup, CSSTransition } from "react-transition-group"

class PageTransitionHandler extends React.Component {
  shouldComponentUpdate() {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    return this.props.children
  }
}

const PageTransition = ({ children }) => (
  <Location>
    {({ location }) => (
      <TransitionGroup className="CSSTransitionFadeLift---root">
        <CSSTransition
          key={location.pathname}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames="CSSTransitionFadeLift"
        >
          <PageTransitionHandler location={location}>
            <div>
              {children}
            </div>
          </PageTransitionHandler>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
)

export default PageTransition
