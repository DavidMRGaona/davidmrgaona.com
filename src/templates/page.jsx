import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

const PageTemplate = ({ data }) => {
  const page = data.markdownRemark
  const { title, description, slug } = page.frontmatter

  return (
    <article id={slug}>
      <header>
        <div className='container' style={{ paddingBottom: 0 }}>
          <h1>{title}</h1>
          <p className='description'>{description}</p>
        </div>
      </header>

      <section
        className='container'
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </article>
  )
}

PageTemplate.Layout = Layout

export default PageTemplate

export const Head = ({ data }) => {
  const page = data.markdownRemark
  return (
    <SEO
      title={`${page.frontmatter.title} | ${config.siteTitle}`}
    />
  )
}

export const pageQuery = graphql`
    query PageBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                description
                slug
            }
        }
    }
`
