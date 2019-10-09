import React from "react"
import { Link } from "gatsby"
import Headroom from "react-headroom"
import { rhythm, scale } from "../utils/typography"
import WildCardsLogo from "../img/wild-cards-small.png"

import Menu from "./Menu"

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
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`https://wildcards.world`}
          >
            <img src={WildCardsLogo} style={{maxHeight: '50px', margin: rhythm(1 / 2),}}/>            
          </Link>        
        <Menu />
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
          <small>© {new Date().getFullYear()}, Built with ❤ by <a href='https://wildcards.world'>Team Wildcards</a>
          {` using `}
          <a href="https://www.gatsbyjs.org">Gatsby</a></small>
        </footer>
      </div>
    )
  }
}

export default Layout
