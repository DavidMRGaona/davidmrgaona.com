import React, { useEffect, useMemo, useState } from 'react'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import useIsClient from '../utils/hooks/use-is-client'
import config from '../utils/config'

import github from '../assets/nav-github.png'

const madeWithLinks = [
  { url: '/', label: 'Home', description: 'Home' },
  { url: '/blog', label: 'Articles', description: 'Tutorials, technical articles, snippets, and reference materials' },
  { url: '/notes', label: 'Notes', description: 'Anything else I want to write.' },
  { url: '/projects', label: 'Projects', description: 'A few highlights of my open-source projects.' },
  { url: '/me', label: 'About me', description: 'A little about me and links to talks, interviews, etc.' },
  // {url: '/resume', label: 'Resume', description: 'My professional experience.'},
]

const WebsiteIndex = ({ data }) => {
  const [followers, setFollowers] = useState(0)
  const latest = data.latest.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const isClient = useIsClient();

  useEffect(() => {
    async function getGithubAPI() {
      const response = await fetch('https://api.github.com/users/davidmrgaona')
      return await response.json()
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  if ( !isClient ) return null;

  return (
    <article className='hero'>
      <header>
        <div className='container'>
          <h1>Hey, I'm David.</h1>
          <p className='subtitle small'>
            I'm a <strong>web developer</strong> in{' '}
            <strong>Toledo</strong>. I love sharing{' '}
            <Link to='/blog'>my knowledge</Link>. This website is my little
            space — a compendium of the things I've learned and created over
            the years.
          </p>
          <p className='hero-buttons'>
            {followers && (
              <a
                href='https://github.com/davidmrgaona'
                className='button icon-button'
              >
                <img src={github} alt='GitHub' />
                {Number(followers).toLocaleString()} GitHub followers
              </a>
            )}
          </p>
        </div>
      </header>

      <div className='container'>
        <h2 className='flex-header'>
          <span>Latest Articles</span> <Link to='/blog'>View All</Link>
        </h2>
        <Posts data={simplifiedLatest} />

        <h2>Sitemap</h2>

        <ul>
          {madeWithLinks.map((link) => (
            <li key={link.url}>
              <Link to={link.url}>{link.label}</Link> - {link.description}
            </li>
          ))}
          <li>
            <strong>Links</strong>
            <ul>
              <li>
                <a href='https://github.com/davidmrgaona'>GitHub</a> - Open
                source projects
              </li>
              <li>
                <a href='https://twitter.com/davidmrgaona'>Twitter</a> - Random
                thoughts
              </li>
              <li>
                <a
                  href='/rss.xml'
                  target='_blank'
                  rel='noopener noreferrer'
                  key='/rss.xml'
                >
                  RSS feed
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </article>
  )
}

WebsiteIndex.Layout = Layout

export default WebsiteIndex

export const Head = () => (
  <SEO title={config.siteTitle} />
)

export const pageQuery = graphql`
    query IndexQuery {
        latest: allMarkdownRemark(
            limit: 5
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
                    }
                }
            }
        }
    }
`
