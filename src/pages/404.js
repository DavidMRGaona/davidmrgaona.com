import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

// markup
export default function NotFoundPage () {
  return (
    <>
      <Helmet title={`404 | ${config.siteTitle}`}/>
      <SEO/>

      <article>
        <header>
          <div className="container">
            <h1>404</h1>
            <p className="description">This was probably a mistake.</p>
          </div>
        </header>

        <section>
          <div className="container">
            <img src="/logo.png" alt="Logo" className="not-found-image"/>
          </div>
        </section>
      </article>
    </>
  )
}

NotFoundPage.Layout = Layout
