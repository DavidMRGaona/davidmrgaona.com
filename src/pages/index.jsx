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
  {
    url: '/blog',
    label: 'Artículos',
    description: 'Tutoriales, artículos técnicos, snippets y materiales de referencia.',
  },
  { url: '/notes', label: 'Notas', description: 'Cualquier otra cosa que quiera escribir' },
  { url: '/projects', label: 'Proyectos', description: 'Algunos de mis proyectos destacados de código abierto' },
  { url: '/me', label: 'Sobre mí', description: 'Un poco sobre mí, enlaces para conectar, entrevistas, etc.' },
  // {url: '/resume', label: 'Resume', description: 'My professional experience.'},
]

const WebsiteIndex = ({ data }) => {
  const [followers, setFollowers] = useState(0)
  const latest = data.latest.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const isClient = useIsClient()

  useEffect(() => {
    async function getGithubAPI() {
      const response = await fetch('https://api.github.com/users/davidmrgaona')
      return await response.json()
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  if (!isClient) return null

  return (
    <article className='hero'>
      <header>
        <div className='container'>
          <h1>Ey, soy David.</h1>
          <p className='subtitle small'>
            Soy <strong>desarrollador web</strong> en{' '} <strong>Toledo</strong>. Me encanta compartir{' '} <Link
            to='/blog'>mi conocimiento</Link>. Esta web es mi pequeño espacio — un compendio de cosas que he ido
            aprendiendo a lo largo de los años.
          </p>
          <p className='hero-buttons'>
            <a
              href='https://github.com/davidmrgaona'
              className='button icon-button'
              >
              <img src={github} alt='GitHub' />
              {Number(followers).toLocaleString()} Seguidores en Github
            </a>
          </p>
        </div>
      </header>

      <div className='container'>
        <h2 className='flex-header'>
          <span>Últimos artículos</span> <Link to='/blog'>Ver todos</Link>
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
            <strong>Enlaces</strong>
            <ul>
              <li>
                <a href='https://github.com/davidmrgaona'>GitHub</a> - Proyectos de código abierto
              </li>
              <li>
                <a href='https://twitter.com/davidmrgaona'>Twitter</a> - Pensamientos aleatorios
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
