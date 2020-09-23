/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm, scale } from "../utils/typography"

function Bio({ postAuthor }) {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        const { twitter } = data.site.siteMetadata.social
        const { instagram } = data.site.siteMetadata.social

        return (
          <div
            style={{
              display: `flex`,
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <div>
              <strong>{postAuthor}</strong>
              <p
                style={{
                  ...scale(-1 / 5),
                }}
              >
                Lover of bamboo shoots, foraging and shaddy branches
                <br />
                You can connect with me via{" "}
                <a href={`https://www.instagram.com/${instagram}`}>Instagram</a>
                {", "}
                <a href={`https://twitter.com/${twitter}`}>Twitter</a> or{" "}
                <a href={`https://facebook.com/wildcards.conservation`}>
                  Facebook
                </a>
                .
              </p>
            </div>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/wildcards.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          instagram
        }
      }
    }
  }
`

export default Bio
