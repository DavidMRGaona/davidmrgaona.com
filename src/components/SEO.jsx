import React from 'react'

import config from '../utils/config'
import { useSiteMetadata } from '../utils/hooks/use-site-metadata'

export const SEO = ({ title, description, pathname, children, postNode, postPath, postSEO, customDescription }) => {
  let { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata()
  let image = config.siteLogo

  if (postSEO) {
    const postMeta = postNode.frontmatter
    title = postMeta.title || defaultTitle
    description = postNode.excerpt || defaultDescription

    if (postMeta.thumbnail) {
      image = postMeta.thumbnail.childImageSharp.gatsbyImageData.src
    }

    siteUrl = `${config.siteUrl}${postPath}` || siteUrl
  } else {
    title = config.siteTitle || defaultTitle
    description = description || defaultDescription
  }

  image = `${config.siteUrl}${image}`
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl || siteUrl,
      name: title,
      alternateName: title,
    },
  ]

  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': siteUrl,
              name: title,
              image,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: config.siteUrl,
        name: title,
        alternateName: title,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
      }
    )
  }
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="image" content={image}/>

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      <meta property="og:url" content={postSEO ? siteUrl : config.siteUrl}/>
      {postSEO && <meta property="og:type" content="article"/>}
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={image}/>

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={image}/>
    </>
  )
}
