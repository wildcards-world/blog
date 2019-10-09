import React from "react"
import { Link } from "gatsby"
import Headroom from "react-headroom"
import { rhythm, scale } from "../utils/typography"

// import Menu from "./Menu"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    let header

    header = (
      <div
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <h1
          style={{
            ...scale(2 / 2.25),
            fontWeight: "bold",
            margin: rhythm(1 / 2),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`https://wildcards.world`}
          >
            {/* <img src='./content/assets/wild-cards.png'/> */}
            {title}
          </Link>
        </h1>
        {/* <Menu /> */}
      </div>
    )

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
        }}
      >
        <Headroom>
          <header>
          {header}
          </header>
        </Headroom>

        <main>{children}</main>

        <footer>
          © {new Date().getFullYear()}, Built with ❤ by <a href='https://wildcards.world'>Team Wildcards</a>
          {` using `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
