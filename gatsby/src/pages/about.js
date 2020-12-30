import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
    <Layout composition='EmptyBars.org - About'>
    <SEO title="About"/>
        <p>
            EmptyBars.org was created with a purpose to help musicians to study new musical piececs. Lots of musical teachers advice their students
            to learn pieces by splitting them on sections and then studying each section individually.
            (E.g. <a href='https://www.libertyparkmusic.com/learn-music-quickly/#p4' target='_blank' rel='noreferrer'
                >here</a> or <a href='https://youtu.be/S-en1Bi7kwY?t=171' target='_blank' rel='noreferrer'
                >here</a>.)
        </p>
        <p>
            On this website you can find musical compositions performed by wonderful musicians
            and uploaded on YouTube. Each composition is split on sections and each section is linked
            to a particular place in the sheet music for convenient studying.
        </p>
        <p>
            You could also split any YouTube video on sections by yourself, see <a href="/editor-how-to">Editor - how to use</a> and <a href="/player-how-to">Player - how to use</a> for more details.
        </p>
        <p>
            You are welcome to contribute your works to the website. Please see <a href="/contribute">Contribute</a> for more details.
        </p>
    </Layout>
)

export default NotFoundPage
