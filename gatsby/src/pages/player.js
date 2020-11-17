import React from "react"
import {graphql, Link} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet";

const EditorPage = ( { data }) => {
    return <Layout composition='EmptyBars.org - Player'>
        <SEO title='Player' />
        <div>
            Loading...
            <script id='sectionsData' type="application/json">""</script>
        </div>
        <Helmet>
            {data.playerCss.urls.map((url, idx) =>
                <link href={url} rel="stylesheet" key={'playerCss' + idx}/>
            )}

            {data.playerJs.urls.map((url, idx) =>
                <script src={url} defer={true} key={'playerJs' + idx}></script>
            )}
        </Helmet>
    </Layout>
}

export default EditorPage

export const query = graphql`
    query  {
  playerCss {
    urls
  }
  playerJs {
    urls
  }
 }`
