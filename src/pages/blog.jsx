import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <article className='blog-page'>
      <header>
        <div className='container'>
          <h1>Artículos</h1>
          <p className='description'>
            Tutoriales, artículos técnicos, snippets, materiales de referencia y todos los recursos relacionados con el
            desarrollo que he escrito. Mira{' '} <Link to='/notes'>Notas</Link> para todo lo demás.
          </p>
        </div>
      </header>

      <section>
        <div className='container'>
          <Search data={simplifiedPosts} showYears />
        </div>
      </section>
    </article>
  )
}

BlogIndex.Layout = Layout

export default BlogIndex

export const Head = () => (
  <SEO
    title={`Artículos | ${config.siteTitle}`}
    customDescription='Tutoriales, artículos técnicos, snippets, materiales de referencia y todos los recursos relacionados con el desarrollo que he escrito.'
  />
)

export const pageQuery = graphql`
    query BlogQuery {
        allMarkdownRemark(
            sort: {frontmatter: {date: DESC}}
            filter: {frontmatter: {template: {eq: "post"}}}
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
                        tags
                        categories
                    }
                }
            }
        }
    }
`
