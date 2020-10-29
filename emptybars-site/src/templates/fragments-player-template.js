import React from "react"
import {graphql, Link} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet";

const SecondPage = ( {pageContext, data} ) => (
    <Layout>
                        <SEO title="Page two"/>
                        <h1>Hi from the second page</h1>
                        <div>
                            <script id='playerData' type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify(pageContext.fragments, null, 3)}}>
                            </script>
                        </div>
                        <p>Welcome to page 2</p>
                        <Link to="/">Go back to the homepage</Link>
                        <Helmet>
                            {data.playerCss.urls.map((url, idx) =>
                                <link href={url} rel="stylesheet" key={'playerCss' + idx} />
                            )}

                            {data.playerJs.urls.map((url, idx) =>
                                <script src={url} defer={true} key={'playerJs' + idx}></script>
                            )}
                        </Helmet>
                </Layout>
)

export default SecondPage

export const query = graphql`
    query  {
  playerCss {
    urls
  }
  playerJs {
    urls
  }
}
`