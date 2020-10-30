import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image";

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: "darkblue",
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0.5rem 1.0875rem 0 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>

        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
            <Image />
          {/*{siteTitle}*/}
        </Link>
      </h1>
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
