import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'
import github from '../assets/nav-github.png'

const projectsList = [
  {
    name: 'davidmrgaona.com',
    slug: 'davidmrgaona.com',
    tagline: 'The source of this website.',
    url: 'https://davidmrgaona.com'
  }
]

export default function ProjectsIndex () {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    async function getStars () {
      const repos = await fetch(
        'https://api.github.com/users/davidmrgaona/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Helmet title={`Projects | ${config.siteTitle}`}/>
      <SEO/>

      <article>
        <header>
          <div className="container">
            <h1>Projects</h1>
            <p className="description">
              A few highlights of my open-source projects. View them all{' '}
              <a href="https://github.com/davidmrgaona">on GitHub</a>.
            </p>
          </div>
        </header>

        <section className="projects large container">
          {projectsList.map((project) => (
            <div className="project" key={project.name}>
              <h2>{project.name}</h2>
              <div className="links tags">
                {project.writeup && <Link to={project.writeup}>Write-up</Link>}
                <a
                  href={`https://github.com/davidmrgaona/${project.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source
                </a>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
              </div>
              <p className="description">{project.tagline}</p>
              <div className="stars">
                {repos.find((repo) => repo.name === project.slug) && (
                  <>
                    <img src={github} alt="Stargazers"/>
                    <span>
                      <a
                        href={`https://github.com/davidmrgaona/${project.slug}/stargazers`}
                      >
                        {Number(
                          repos.find((repo) => repo.name === project.slug)
                            .stargazers_count
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
    </>
  )
}

ProjectsIndex.Layout = Layout
