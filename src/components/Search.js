import React, { useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import * as queryString from 'query-string'
import { navigate, useLocation } from '@reach/router'

import searchIcon from '../assets/nav-search.png'
import { Posts } from './Posts'

export const Search = ({data}) => {
  const location = useLocation()
  const searchRef = useRef(null)
  const {search} = queryString.parse(location.search)
  const [query, setQuery] = useState(search || '')
  const {localSearchPages} = useStaticQuery(graphql`
      query {
          localSearchPages {
              index
              store
          }
      }
  `)

  const results = useFlexSearch(
    query,
    localSearchPages.index,
    localSearchPages.store
  )

  return (
    <>
      <div className="search-bar">
        <input
          ref={searchRef}
          id="search"
          type="search"
          className="search-input"
          placeholder="Comienza a escribir para buscar..."
          value={query}
          onChange={(e) => {
            navigate(e.target.value ? `/blog/?search=${e.target.value}` : '')
            setQuery(e.target.value)
          }}
        />
        <img
          className="search-icon"
          src={searchIcon}
          alt="Buscar"
          onClick={() => searchRef.current.focus()}
        />
      </div>
      <section>
        {query ? (
          results.length > 0 ? (
            <Posts data={results} showYears query={query}/>
          ) : (
            <p style={{marginTop: '2rem'}}>
              Lo lamento, nada coincide con la búsqueda.
            </p>
          )
        ) : (
          <Posts data={data} showYears/>
        )}
      </section>
    </>
  )
}
