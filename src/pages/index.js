import React, { useEffect, useMemo, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import github from '../assets/nav-github.png'

export default function WebsiteIndex ({data}) {
  const [followers, setFollowers] = useState(0)
  const latest = data.latest.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])

  useEffect(() => {
    async function getGithubAPI () {
      const response = await fetch('https://api.github.com/users/davidmrgaona')
      const data = await response.json()

      return data
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  return (
    <>
      <Helmet title={config.siteTitle}/>
      <SEO/>

      <article className="hero">
        <header>
          <div className="container">
            <h1>Hey, I'm David.</h1>
            <p className="subtitle small">
              I'm a <strong>web developer</strong> in{' '}
              <strong>Toledo</strong>. I love sharing{' '}
              <Link to="/blog">my knowledge</Link>. This website is my little
              space — a compendium of the things I've learned and created over
              the years.
            </p>
            <p className="hero-buttons">
              {followers && (
                <a
                  href="https://github.com/davidmrgaona"
                  className="button icon-button"
                >
                  <img src={github} alt="GitHub"/>
                  {Number(followers).toLocaleString()} GitHub followers
                </a>
              )}
            </p>
          </div>
        </header>

        <div className="container">
          <h2 className="flex-header">
            <span>Latest Articles</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedLatest}/>

          <h2>Sitemap</h2>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Articles</Link> - Tutorials, technical articles,
              snippets, and reference materials.
            </li>
            <li>
              <Link to="/notes">Notes</Link> - Anything else I want to write.
            </li>
            <li>
              <Link to="/projects">Projects</Link> - A few highlights of my
              open-source projects.
            </li>
            <li>
              <Link to="/me">About me</Link> - A little about me and links to
              talks, interviews, etc.
            </li>
            <li>
              <Link to="/resume">Resume</Link> - My professional experience (I'm
              not looking).
            </li>
            <li>
              <strong>Other stuff</strong>
              <ul>
                <li>
                  <Link to="/rss.xml">RSS feed</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </article>
    </>
  )
}

WebsiteIndex.Layout = Layout

export const pageQuery = graphql`
    query IndexQuery {
        latest: allMarkdownRemark(
            limit: 5
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { template: { eq: "post" } } }
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
                    }
                }
            }
        }
    }
`
