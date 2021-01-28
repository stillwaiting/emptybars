import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ResourcesPage = () => (
    <Layout composition='EmptyBars.org - Useful Resources'>
    <SEO title="Useful Resources"/>
    <ul>
        <li><a href='https://www.musictheory.net/exercises/note' target='_blank'>Note identification exercise</a></li>
        <li><a href='https://imgbox.com/' target='_blank'>imgbox - free image hosting</a></li>
        <li><a href='https://www.freepdfconvert.com/pdf-to-jpg' target='_blank'>Free PDF to image converter</a></li>
    </ul>
    </Layout>
)

export default ResourcesPage
