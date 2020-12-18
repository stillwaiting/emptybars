import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"

const Header = ({ composition, composer, performer }) => (
  <header>
    <div>
      <Link to="/">
        <Image />
      </Link>

      <div>
        {composition ? (
          <>
            <h1>
              {composition} {composer ? <span>({composer})</span> : ""}
            </h1>
            {performer ? <span>Performed by {performer}</span> : ""}
          </>
        ) : (
          ""
        )}
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
