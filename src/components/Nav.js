import React from 'react'
import { Link } from 'gatsby'

import blog from '../assets/nav-blog.png'
import floppy from '../assets/nav-floppy.png'
import github from '../assets/nav-github.png'
import projects from '../assets/nav-projects.png'
import twitter from '../assets/nav-twitter.png'
import linkedin from '../assets/nav-linkedin.png'

const mainNavItems = [
  {url: '/blog', icon: blog, label: 'Artículos'},
  {url: '/projects', icon: projects, label: 'Proyectos'},
  {url: '/me', icon: floppy, label: 'Sobre mí'},
]

const socialNavItems = [
  {url: 'https://github.com/davidmrgaona', icon: github, label: 'GitHub'},
  {url: 'https://www.linkedin.com/in/davidmanuelramosgaona/', icon: linkedin, label: 'LinkedIn'},
  {url: 'https://twitter.com/davidmrgaona', icon: twitter, label: 'Twitter'},
]

export const Nav = () => {
  return (
    <aside className="navbar">
      <section>
        <nav>
          {mainNavItems.map((item) => (
            <Link to={item.url} key={item.label} activeClassName="active">
              <img src={item.icon} alt={item.label}/>
              <div className="tooltip">{item.label}</div>
            </Link>
          ))}
        </nav>
        <nav>
          {socialNavItems.map((item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              key={item.label}
            >
              <img src={item.icon} alt={item.label}/>
              <div className="tooltip">{item.label}</div>
            </a>
          ))}
        </nav>
      </section>
    </aside>
  )
}
