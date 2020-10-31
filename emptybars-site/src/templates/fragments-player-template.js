import React from "react"
import {graphql, Link} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet";

const SecondPage = ( {pageContext, data} ) => {
    return <Layout>
        <SEO title="Page two"/>
        <h1>{data.composition.edges[0].node.fields.content} ({data.composer.edges[0].node.fields.content})</h1>
        <div><p>Performed by: {data.performer.edges[0].node.fields.content}</p></div>
        <div>
            Initialising...
            <script id='playerData' type="application/json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(pageContext.fragments, null, 3)}}>
            </script>
        </div>
        <Link to="/">Go back to the homepage</Link>
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

export default SecondPage

export const query = graphql`
    query fragmentsTemplateQuery($composerNamePath: String, $compositionNamePath: String, $performerNamePath:String) {
  playerCss {
    urls
  }
  playerJs {
    urls
  }
  composer: allFile(filter: {relativePath: {eq: $composerNamePath}}) {
    edges {
      node {
        fields {
          content
        }
      }
    }
  }
  
  composition: allFile(filter: {relativePath: {eq: $compositionNamePath}}) {
    edges {
      node {
        fields {
          content
        }
      }
    }
  }
  
  performer:allFile(filter: {relativePath: {eq: $performerNamePath}}) {
    edges {
      node {
        fields {
          content
        }
      }
    }
  }
}
`