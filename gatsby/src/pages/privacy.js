import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
    <Layout composition='EmptyBars.org - Privacy Policy'>
    <SEO title="Privacy Policy"/>
    <h2>Information we collect</h2>

        <p>
            We ("EmptyBars.org") knowingly are not collecting any information about you! However, to make the website work,
            we use several 3rd party services that are beyond our control and that could be collecting information about you.
            The complete list of these services is below.
        </p>
            <ul>
                <li><a href='https://youtube.com'>YouTube</a> - we use YouTube player to play segmented videos;</li>
                <li><a href='https://netlify.com'>Netlify</a> - the website is hosted on Netlify infrastructure.</li>
            </ul>
        <p>
            Please check their Privacy Policies to find out more details.
        </p>

    <h2>Contact information</h2>
        <p>
            Should you have any questions, please don't hesitate to raise a question at <a href='https://github.com/stillwaiting/emptybars/issues'>https://github.com/stillwaiting/emptybars/issues</a> and
            we will do our best to answer it in a timely manner.
        </p>
    </Layout>
)

export default NotFoundPage
