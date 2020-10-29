import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet";

const SecondPage = (props) => (
    <Layout>
                        <SEO title="Page two"/>
                        <h1>Hi from the second page</h1>
                        <div>
                            <script id='playerData' type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify(props.pageContext.fragments, null, 3)}}>
                            </script>
                        </div>
                        <p>Welcome to page 2</p>
                        <Link to="/">Go back to the homepage</Link>
                        <Helmet>
                            <link href="https://lucid-mestorf-8474c9.netlify.app/player/build/static/css/main.a8130036.chunk.css" rel="stylesheet" />
                            <script src="https://lucid-mestorf-8474c9.netlify.app/player/build/static/js/runtime-main.eadbef0b.js" defer={true}></script>
                            <script src="https://lucid-mestorf-8474c9.netlify.app/player/build/static/js/2.c7f4a97a.chunk.js" defer={true}></script>
                            <script src="https://lucid-mestorf-8474c9.netlify.app/player/build/static/js/main.0e2e646f.chunk.js" defer={true}></script>

                        </Helmet>
                </Layout>
)

export default SecondPage
