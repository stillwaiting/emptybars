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
            EmptyBars.org does not knowingly use cookies neither to track or to identify you. The only information that we save
            in your browser is the state of the last edited video (see "Editor - How To" section about more details), which is
            exactly the information provided by you.
        </p>

        <p>
            If you wish to delete this information now, please click on <a href='javascript:(window.localStorage.setItem("emptybarsEditorData", false) || alert("The local storage has been cleaned! Thank you."))'>this link</a>.
        </p>
    </Layout>
)

export default NotFoundPage
