import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import ShortBio from "../components/ShortBio"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const maxWidth = rhythm(27)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `wildcards`, `blockchain`, `crypto`, `crypto`]}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingLeft: rhythm(1),
            paddingRight: rhythm(1),
          }}
        >
          <div style={{ maxWidth: maxWidth }}>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <h3
                    style={{
                      ...scale(1 / 3),
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{
                        boxShadow: `none`,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                      to={node.fields.slug}
                    >
                      {title}
                    </Link>
                  </h3>
                  <p
                    style={{
                      ...scale(-1.5 / 7),
                      color: "grey",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                  <br />
                  <ShortBio post={node} hideAvatar hideAuthor />
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`


/*
gatsby gatsby-image gatsby-plugin-feed gatsby-plugin-google-analytics gatsby-plugin-manifest gatsby-plugin-offline gatsby-plugin-react-helmet gatsby-plugin-sharp gatsby-plugin-typography gatsby-remark-copy-linked-files gatsby-remark-embed-youtube gatsby-remark-images gatsby-remark-prismjs gatsby-remark-responsive-iframe gatsby-remark-smartypants gatsby-source-filesystem gatsby-transformer-remark gatsby-transformer-sharp prismjs react react-dom react-headroom react-helmet react-typography reading-time sharp typeface-merriweather typeface-montserrat typography typography-theme-github */
