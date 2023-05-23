import React from 'react'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

// markup
const NotFoundPage = () => {
  return (
    <article>
      <header>
        <div className='container'>
          <h1>404</h1>
          <p className='description'>Esto probablemente sea un error.</p>
        </div>
      </header>

      <section>
        <div className='container'>
          <img src='/logo.png' alt='Logo' className='not-found-image' />
        </div>
      </section>
    </article>
  )
}

NotFoundPage.Layout = Layout

export default NotFoundPage

export const Head = () => (
  <SEO title={`404 | ${config.siteTitle}`} />
)
