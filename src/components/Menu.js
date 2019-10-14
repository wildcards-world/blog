import React from "react"
import { Link } from "gatsby"

import { scale, rhythm } from "../utils/typography"

function Menu() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: 'white',
        height: '70px',
        borderBottom: '1px solid #333'
      }}
    >      
            <a
              style={{
                boxShadow: 'none',
                textDecoration: `none`,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "grey",
                ...scale(-1 / 5),
                margin: rhythm(1),
              }}
              href="https://wildcards.world"
            >
              <p>Home</p>
            </a>      
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: `none`,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "grey",
            
            ...scale(-1 / 5),
            margin: rhythm(1),
          }}
          to={'/'}
        >
          <p>Blog</p>
        </Link>
    </div>
  )
}

export default Menu
