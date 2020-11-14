import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
    <Layout composition='EmptyBars.org - About'>
    <SEO title="About"/>
        <p>
            EmptyBars.org was created with a purpose to help musicians to learn. Many teachers advice their students
            to learn new pieces by splitting them up onto sections and then learn each section separately.
            (E.g. <a href='https://www.libertyparkmusic.com/learn-music-quickly/#p4' target='_blank'>here</a>
            or <a href='https://youtu.be/S-en1Bi7kwY?t=171' target='_blank'>here</a>)
        </p>
    </Layout>
)

export default NotFoundPage
