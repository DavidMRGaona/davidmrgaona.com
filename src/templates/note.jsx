import React from 'react'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

const NoteTemplate = ({ data }) => {
  const note = data.markdownRemark
  const { title, slug, date } = note.frontmatter

  return (
    <article id={slug}>
      <header>
        <div className='container' style={{ paddingBottom: 0 }}>
          <p>
            <Link to='/notes'>Back to Notes</Link>
          </p>
          <h1>{title}</h1>
          <div className='post-details'>
            Written by <Link to='/me'>David M. Ramos Gaona</Link> on{' '}
            <time>{date}</time>
          </div>
        </div>
      </header>

      <section
        className='container'
        dangerouslySetInnerHTML={{ __html: note.html }}
      />

      <section>
        <div className='container'>
          <div className='divider' />
          <p>
            Comments? Feel free to{' '}
            <a href='mailto:hello[at]davidmrgaona[dot]com'>email me</a>.
          </p>
          <p>
            <Link to='/notes'>Back to Notes</Link>
          </p>
        </div>
      </section>
    </article>
  )
}

NoteTemplate.Layout = Layout

export default NoteTemplate

export const Head = ({ data }) => {
  const note = data.markdownRemark
  return (
    <SEO
      title={`${note.frontmatter.title} | ${config.siteTitle}`}
    />
  )
}

export const pageQuery = graphql`
    query notePage($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                slug
            }
        }
    }
`
