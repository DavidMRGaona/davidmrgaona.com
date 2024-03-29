import React from 'react'
import { useLocation } from '@reach/router'
import { Link } from 'gatsby'

import { Hamburger } from '../assets/Hamburger'
import { Colors } from './Colors'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'

export const FileHeader = ({setCollapsed, onUpdateTheme, theme}) => {
  const location = useLocation()
  const slug = location.pathname

  return (
    <header className="file-header">
      {!(slug.includes('/notes') || slug.includes('/resume')) && (
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="desktop-only"
          title="Collapse Sidebar"
        >
          <Hamburger/>
        </button>
      )}
      <Link to="/" className="file">
        <span>DavidMRGaona.com</span>
      </Link>
      <div className="toolbar">
        <Colors/>
        <button onClick={onUpdateTheme} className="theme-switcher">
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
          <img src={theme === 'dark' ? moon : sun} alt="Theme"/>
        </button>
      </div>
    </header>
  )
}
