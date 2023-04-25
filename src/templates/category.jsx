import React, { useMemo } from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

const CategoryTemplate = ({ data, pageContext }) => {
  let { category } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <>
      <article>
        <header>
          <div className='container'>
            <h1>{category}</h1>
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

CategoryTemplate.Layout = Layout

export default CategoryTemplate

export const Head = ({ pageContext }) => {
  const { category } = pageContext
  return (
    <SEO title={`${category} | ${config.siteTitle}`} />
  )
}

export const pageQuery = graphql`
    query CategoryPage($category: String) {
        allMarkdownRemark(
            sort: {frontmatter: {date: DESC}}
            filter: {frontmatter: {categories: {in: [$category]}}}
        ) {
            totalCount
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        description
                        tags
                        categories
                    }
                }
            }
        }
    }
`
