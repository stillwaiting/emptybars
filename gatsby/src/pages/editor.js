import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"

const EditorPage = ({ data }) => {
  return (
    <Layout composition="EmptyBars.org - Editor">
      <SEO title="Editor" />
      <div>
        Loading...
        <script id="sectionsData" type="application/json">
          ""
        </script>
      </div>
      <Helmet>
        {data.editorCss.urls.map((url, idx) => (
          <link href={url} rel="stylesheet" key={"editorCss" + idx} />
        ))}

        {data.editorJs.urls.map((url, idx) => (
          <script src={url} defer={true} key={"editorJs" + idx} />
        ))}
      </Helmet>
    </Layout>
  )
}

export default EditorPage

export const query = graphql`
  query {
    editorCss {
      urls
    }
    editorJs {
      urls
    }
  }
`
