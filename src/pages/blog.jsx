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
          <h1>Articles</h1>
          <p className='description'>
            Tutorials, technical articles, snippets, reference materials, and
            all development-related resources I've written. See{' '}
            <Link to='/notes'>Notes</Link> for everything else.
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
    title={`Articles | ${config.siteTitle}`}
    customDescription="Tutorials, technical articles, snippets, reference materials, and all
              development-related resources I've written."
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
