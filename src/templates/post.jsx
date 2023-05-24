import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'

import { appendComments, slugify } from '../utils/helpers'
import useIsClient from '../utils/hooks/use-is-client'
import { Comments } from '../components/Comments'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'

const PostTemplate = ({data}) => {
  const post = data.markdownRemark
  const {tags, title, description, date} = post.frontmatter
  const commentBox = React.createRef()
  const isClient = useIsClient()

  useEffect(() => {
    appendComments(commentBox)
  }, [commentBox])

  if (!isClient) return null

  return (
    <>
      <article>
        <header>
          <div className="container">
            <h1>{title}</h1>
            <div className="post-meta">
              {tags && (
                <div className="tags">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${slugify(tag)}`}
                      className={`tag-${tag}`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
              <div className="post-details">
                Escrito por <Link to="/me">David M. Ramos Gaona</Link> el{' '}
                <time>{date}</time>
              </div>
            </div>
            {description && <p className="description">{description}</p>}
          </div>
        </header>

        <div
          id={post.fields.slug}
          className="container"
          dangerouslySetInnerHTML={{__html: post.html}}
        />
      </article>

      <section id="comments" className="comments container">
        <h2>Comments</h2>
        <Comments commentBox={commentBox}/>
      </section>
    </>
  )
}

PostTemplate.Layout = Layout

export default PostTemplate

export const Head = ({ data }) => {
  const post = data.markdownRemark
  return (
    <SEO
      title={`${post.frontmatter.title} | ${config.siteTitle}`}
      postPath={post.fields.slug}
      postNode={post}
      postSEO
    />
  )
}

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            excerpt
            fields {
                slug
            }
            frontmatter  {
                title
                date(formatString: "MMMM DD, YYYY")
                tags
                description
#                thumbnail {
#                    childImageSharp {
#                        gatsbyImageData(width: 150, height: 150)
#                    }
#                }
            }
        }
    }
`
