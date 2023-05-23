import React, { useMemo } from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

const NoteIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <article className='blog-page'>
      <header>
        <div className='container'>
          <h1>Notes</h1>
          <p className='description'>
            Notes, musings, and whatever else I want to write.
          </p>
        </div>
      </header>

      <section>
        <div className='container'>
          <Posts data={simplifiedPosts} showYears prefix='notes' />
        </div>
      </section>
    </article>
  )
}

NoteIndex.Layout = Layout

export default NoteIndex

export const Head = () => (
  <SEO
    title={`Notes | ${config.siteTitle}`}
    customDescription='Notes, musings, and whatever else I want to write.'
  />
)

export const pageQuery = graphql`
    query NotesQuery {
        allMarkdownRemark(
            sort: {frontmatter: {date: DESC}}
            filter: {frontmatter: {template: {eq: "note"}}}
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                    }
                }
            }
        }
    }
`
