import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'

import useIsClient from '../utils/hooks/use-is-client'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'
import github from '../assets/nav-github.png'

const projectsList = [
  {
    name: 'davidmrgaona.com',
    slug: 'davidmrgaona.com',
    tagline: 'El origen de esta web.',
    url: 'https://davidmrgaona.com',
  },
  {
    name: 'Mi blockchain',
    slug: 'my-blockchain',
    tagline: 'POC de una blockchain en Python.',
  }
]

const ProjectsIndex = () => {
  const [repos, setRepos] = useState([])
  const isClient = useIsClient()

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/davidmrgaona/repos?per_page=100',
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  if (!isClient) return null

  return (
    <article>
      <header>
        <div className='container'>
          <h1>Projects</h1>
          <p className='description'>
            Algunos de mis proyectos destacados de código abierto. Míralos todos{' '}
            <a href='https://github.com/davidmrgaona'>en GitHub</a>.
          </p>
        </div>
      </header>

      <section className='projects large container'>
        {projectsList.map((project) => (
          <div className='project' key={project.name}>
            <h2>{project.name}</h2>
            <div className='links tags'>
              {project.writeup && <Link to={project.writeup}>Escríbeme</Link>}
              <a
                href={`https://github.com/davidmrgaona/${project.slug}`}
                target='_blank'
                rel='noreferrer'
              >
                Código
              </a>
              {project.url && (
                <a href={project.url} target='_blank' rel='noreferrer'>
                  Demo
                </a>
              )}
            </div>
            <p className='description'>{project.tagline}</p>
            <div className='stars'>
              {repos.find((repo) => repo.name === project.slug) && (
                <>
                  <img src={github} alt='Stargazers' />
                  <span>
                      <a
                        href={`https://github.com/davidmrgaona/${project.slug}/stargazers`}
                      >
                        {Number(
                          repos.find((repo) => repo.name === project.slug)
                            .stargazers_count,
                        ).toLocaleString()}
                      </a>
                    {` stars on GitHub`}
                    </span>
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </article>
  )
}

ProjectsIndex.Layout = Layout

export default ProjectsIndex

export const Head = () => (
  <SEO title={`Proyectos | ${config.siteTitle}`} />
)
