import React from "react"

import { Location, globalHistory } from "@reach/router"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import pageTransitionsSmoothScrollingTimeoutDuration
from "../constants/page-transitions-smooth-scrolling-timeout-duration"

import isMobile from "../utils/is-mobile"
import userPrefersReducedMotion from "../utils/user-prefers-reduced-motion"

class PageTransitionHandler extends React.Component {
  shouldComponentUpdate() {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    return this.props.children
  }
}

class PageTransition extends React.Component {
  componentDidMount() {
    this.historyUnsubscribe = globalHistory.listen(({ location, action }) => {
      // Only smooth scroll on desktop and for users who have
      // "no-preference" set for reduced motion
      // https://web.dev/prefers-reduced-motion/
      if (isMobile() || userPrefersReducedMotion()) return

      if (this.pageTransitionSmoothScrollingTimeout) {
        clearTimeout(this.pageTransitionSmoothScrollingTimeout)
      }

      // We add the smooth scrolling attribute only during
      // page transitions so as not to disrupt on-page search:
      // https://css-tricks.com/downsides-of-smooth-scrolling/
      document.documentElement.setAttribute("is-smooth-scrolling", "")

      // Unfortunately, there’s no way to know when smooth scrolling
      // has finished since even if we use browser .scroll() or
      // .scrollIntoView() APIs with `behavior: "smooth"`, there’s
      // still no way to trigger a callback or get a Promise returned.
      // https://github.com/w3c/csswg-drafts/issues/3744

      // However, fortunately, the browser seems to allow smooth
      // scrolling to complete so long as `scroll-behavior: smooth`
      // is set with CSS on <html/> at the moment the scrolling
      // is initiated (in this case either due to hash change or
      // browser history pop state). In other words, even if we
      // remove the styles *during the scroll*, that doesn’t seem
      // to disrupt or shortcircuit the smooth scroll in any way.
      // Nevertheless, we set a small timeout here just to be safe
      // since it’s unlikely a user would initiated a ctrl+f (to
      // do a find within the page) so soon after the page was just
      // navigated. And even if they did, all that happens is that
      // the browser scrolls smoothly to their matches instead of
      // instantaneously, and only until the timeout fires.
      this.pageTransitionSmoothScrollingTimeout = setTimeout(() => {
        document.documentElement.removeAttribute("is-smooth-scrolling")
      }, pageTransitionsSmoothScrollingTimeoutDuration)
    })
  }

  componentWillUnmount() {
    this.historyUnsubscribe()
  }

  render() {
    const { children } = this.props

    if (isMobile() || userPrefersReducedMotion()) {
      return (
        <Location>
          {({ location }) => (
            <div>
              {children({ location })}
            </div>
          )}
        </Location>
      )
    }

    return (
      <Location>
        {({ location }) => (
          <TransitionGroup className="CSSTransitionFadeLift---root">
            <CSSTransition
              key={location.pathname}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false)
              }}
              classNames="CSSTransitionFadeLift"
            >
              <PageTransitionHandler location={location}>
                <div>
                  {children({ location })}
                </div>
              </PageTransitionHandler>
            </CSSTransition>
          </TransitionGroup>
        )}
      </Location>
    )
  }
}

export default PageTransition
