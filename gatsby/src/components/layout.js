/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ composition, composer, performer, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div style={{background: 'white'}}>
      <Header composition={composition} composer={composer} performer={performer} siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          background: 'white',
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>

    <footer style={{
        background: "black",
        marginTop: `2rem`,
        color: "white",
        paddingTop: '20px'
    }}>
        <div style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0.5rem 0 0.5rem 0`,
        }}>
            <div style={{display:'flex'}} className='footerMenu'>
                <div>
                    <ul>
                        <li><a href='#'>About</a></li>
                        <li>Editor (how to use)</li>
                        <li>Player (how to use)</li>
                        <li>Contribute</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>Terms of Use</li>
                        <li>Privacy Policy</li>
                        <li>Intellectual Property</li>
                        <li>Cookies</li>
                    </ul>
                </div>
            </div>
            <div style={{fontSize: '75%'}}>
            © {new Date().getFullYear()},
            Built with&nbsp;<a href="https://www.gatsbyjs.com" style={{color: 'white'}}>Gatsby</a>
            </div>
        </div>

    </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
