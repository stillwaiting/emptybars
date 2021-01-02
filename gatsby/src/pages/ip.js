import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout composition="EmptyBars.org - Intellectual Property">
    <SEO title="Intellectual Property" />
    <h2>To legal right-holders</h2>

    <p>
      "EmptyBars.org" is an open-source, non-commercial project that is
      maintained by a small community of volunteers in their free time without
      any paycheck. The sole mission of the project is to promote classical
      music and musical education around the world.
    </p>

    <p>
      We are doing our best to respect intellectual property rights (copyrights)
      of all the composers and musicians. All the information on our website was
      obtained from public sources on the Internet. However, if you are a legal
      right holder or an owner of any work listed on the website and don't wish
      it to be there, please raise an issue 
      <a href="https://github.com/stillwaiting/emptybars/issues">
        https://github.com/stillwaiting/emptybars/issues
      </a>
      , and we will do our best to remove it as soon as possible.
    </p>
  </Layout>
)

export default NotFoundPage
