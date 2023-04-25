import React, { useMemo } from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <>
      <article>
        <header>
          <div className='container'>
            <h1>
              <span className='deemphasized'>Posts tagged:</span>{' '}
              <span className='primary-underline'>{tag}</span>
            </h1>
            <p className='description'>
              <span className='count'>{totalCount}</span>
              {message}
            </p>
          </div>
        </header>

        <section className='container'>
          <Posts data={simplifiedPosts} />
        </section>
      </article>
    </>
  )
}

TagTemplate.Layout = Layout

export default TagTemplate

export const Head = ({ pageContext }) => {
  const { tag } = pageContext
  return (
    <SEO
      title={`Posts tagged: ${tag} | ${config.siteTitle}`}
    />
  )
}

export const pageQuery = graphql`
    query TagPage($tag: String) {
        allMarkdownRemark(
            sort: {frontmatter: {date: DESC}}
            filter: {frontmatter: {tags: {in: [$tag]}}}
        ) {
            totalCount
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
