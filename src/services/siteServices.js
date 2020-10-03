import { API, graphqlOperation } from 'aws-amplify'

import { createSite, deleteSite as dbDeleteSite } from '../graphql/mutations'
import defaultSiteSettings from '../components/cms/editor/defaultSiteSettings'

export const addSite = async ({ title, ownerID }) => {
  const result = await API.graphql(
    graphqlOperation(createSite, {
      input: { title, ownerID },
    })
  )
  return result
}

export const updateSite = async ({ id, title, netlifyID, netlifyUrl, settings }) => {
  const result = await API.graphql(
    graphqlOperation(
      `mutation UpdateSite(
        $input: UpdateSiteInput!
        $condition: ModelSiteConditionInput
      ) {
        updateSite(input: $input, condition: $condition) {
          id
          title
          netlifyID
          netlifyUrl
          settings
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
      {
        input: { id, title, netlifyID, netlifyUrl, settings: JSON.stringify(settings) },
      }
    )
  )

  if (result?.data?.updateSite) {
    const site = result.data.updateSite

    result.data.updateSite = {
      ...site,
      settings: site.settings ? JSON.parse(site.settings) : defaultSiteSettings,
    }
  }

  return result
}

export const deleteSite = async ({ id }) => {
  const result = await API.graphql(
    graphqlOperation(dbDeleteSite, {
      input: { id },
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
          settings
          postTypes {
            items {
              id
              title
              slug
            }
          }
        }
      }
    `,
      { id: siteID }
    )
  )

  if (result?.data?.getSite) {
    const site = result.data.getSite

    result.data.getSite = {
      ...site,
      settings: site.settings ? JSON.parse(site.settings) : defaultSiteSettings,
    }
  }

  return result
}
