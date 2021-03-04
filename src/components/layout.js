import React, { Fragment } from "react"
import Headroom from "react-headroom"
import { rhythm } from "../utils/typography"
import WildCardsLogo from "../img/wild-cards-small.png"
import WildCardsBanner from "../img/simon.png"

import Menu from "./Menu"

class Layout extends React.Component {
  render() {
    const {
      children,
      location: { pathname },
    } = this.props
    console.log("Propse", this.props)
    let header

    header = (
      <Fragment>
        <div
          style={{
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            href={`https://wildcards.world`}
          >
            <img
              src={WildCardsLogo}
              style={{ maxHeight: "50px", marginTop: rhythm(1 / 2) }}
            />
          </a>
        </div>
        <Menu />
      </Fragment>
    )

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
        }}
      >
        <Headroom>
          <header>{header}</header>
        </Headroom>

        <main>
          {pathname === "/" && (
            <img
              src={WildCardsBanner}
              style={{ width: "70%", margin: "auto", display: "block" }}
            />
          )}
          {children}
        </main>

        <footer style={{ textAlign: "center" }}>
          <small>
            © {new Date().getFullYear()}, Built with ❤ by{" "}
            <a href="https://wildcards.world">Team Wildcards</a>
            {` using `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </small>
        </footer>
      </div>
    )
  }
}

export default Layout
