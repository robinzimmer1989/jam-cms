import { API, graphqlOperation } from 'aws-amplify'

import { createSite, updateSite as dbUpdateSite } from '../graphql/mutations'

export const addSite = async ({ title, ownerID }) => {
  const result = await API.graphql(
    graphqlOperation(createSite, {
      input: { title, ownerID },
    })
  )
  return result
}

export const updateSite = async ({ id, title, netlifyID, netlifyUrl }) => {
  const result = await API.graphql(
    graphqlOperation(dbUpdateSite, {
      input: { id, title, netlifyID, netlifyUrl },
    })
  )

  return result
}

export const getSites = async () => {
  const result = await API.graphql(
    graphqlOperation(`
      query ListSites {
        listSites(limit: 100) {
          items {
            id
            title
            netlifyID
            netlifyUrl
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }
    `)
  )
  return result
}

export const getSite = async ({ siteID }) => {
  const result = await API.graphql(
    graphqlOperation(
      `
      query GetSite($id: ID!) {
        getSite(id: $id) {
          id
          title
          netlifyID
          netlifyUrl
          createdAt
          updatedAt
          owner
          postTypes {
            items {
              id
              title
              slug
              posts {
                items {
                  id
                  title
                  slug
                }
              }
            }
          }
        }
      }
    `,
      { id: siteID }
    )
  )
  return result
}
