import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
    <Layout composition='EmptyBars.org - Cookies'>
    <SEO title="Cookies"/>
    <p>
        Cookies are small text files that websites place on the computers and mobile devices of people who visit those websites.
    </p>
        <p>
            EmptyBars.org neither uses cookies to track nor identify you. The only information we save in
            your browser is the state of the last edited video
            (see <a href="/editor-how-to">Editor - how to use</a> page for more details), which is exactly the
            information provided by you.
        </p>

        <p>
            If you wish to delete this information now, please click on <a href='javascript:(window.localStorage.setItem("emptybarsEditorData", false) || alert("The local storage has been cleaned! Thank you."))'>this link</a>.
        </p>
    </Layout>
)

export default NotFoundPage
