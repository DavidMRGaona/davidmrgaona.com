import { graphql, useStaticQuery } from 'gatsby'

export const useGetPosts = () => {
  return useStaticQuery(graphql`
      query StaticQuery {
          allMarkdownRemark(
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
                          categories
                      }
                  }
              }
          }
      }
  `)
}
