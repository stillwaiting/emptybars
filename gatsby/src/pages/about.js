import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
    <Layout composition='EmptyBars.org - About'>
    <SEO title="About"/>
        <p>
            EmptyBars.org was created with a purpose to help musicians to learn. Many teachers advice their students
            to learn new pieces by splitting them up onto sections and then learn each section separately.
            (E.g. <a href='https://www.libertyparkmusic.com/learn-music-quickly/#p4' target='_blank' rel='noreferrer'
                >here</a> or <a href='https://youtu.be/S-en1Bi7kwY?t=171' target='_blank' rel='noreferrer'
                >here</a>.)
        </p>
        <p>
            This is exactly what this project is about. On this website you can find musical compositions performed
            by wonderful musicians from YouTube. Each composition is split onto segments and binded to the sheet music, so
            you could listen and study it bit by bit.
        </p>
        <p>
            You could also split ANY YouTube video that you'd like (see Editor) and play it back later by segments
            (see Player). If the work is qualitative and the sheet music is in the public domain, you are very welcome
            to contribute to the project and add this composition to the website (see how to do that).
            Before doing that, please make sure you are not infringing any copyrights.
        </p>
    </Layout>
)

export default NotFoundPage
