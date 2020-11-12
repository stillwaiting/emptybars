import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image";

const Header = ({ composition, composer, performer }) => (
  <header
    style={{
      background: "darkblue",
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        display: "flex",
        maxWidth: 960,
        padding: `0.5rem 0 0.5rem 0`,
      }}
    >

        <div>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
            <Image />
            </Link>
        </div>
        <div style={{

        }}>
            {composition
                ?  <div style={{
                    color: "white",
                    paddingLeft: "20px"
                }}>
                        <h1 style={{
                            margin:"0px",
                            paddingTop: "20px",
                        }}>{composition} {composer ? <span>({composer})</span> : ''}</h1>
                    {performer ? <span>Performed by {performer}</span> : ''}
                    </div>
                : ''
            }
        </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
