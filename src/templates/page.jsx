import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

const PageTemplate = ({ data }) => {
  const post = data.markdownRemark
  const { title, description, slug } = post.frontmatter

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
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}

PageTemplate.Layout = Layout

export default PageTemplate

export const Head = ({ pageContext }) => {
  const { title } = pageContext
  return (
    <SEO
      title={`${title === 'David M. Ramos Gaona' ? 'Note' : title} | 
    ${config.siteTitle}`}
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
