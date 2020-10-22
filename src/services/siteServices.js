import { API, graphqlOperation } from 'aws-amplify'
import produce from 'immer'
import { set, get } from 'lodash'

import { createSite, deleteSite as dbDeleteSite } from '../graphql/mutations'
import defaultTheme from 'components/themes/defaultTheme'

const transformSite = site => {
  const nextSite = produce(site, draft => {
    // Parse settings or add default settings if empty
    if (draft.settings) {
      set(draft, `settings`, {
        ...defaultTheme,
        ...JSON.parse(draft.settings),
      })
    } else {
      set(draft, `settings`, defaultTheme)
    }

    // Convert posts and then post types to object structure
    if (get(draft, `postTypes.items`)) {
      draft.postTypes.items.map((o, i) => {
        // Parse template property on post type
        draft.postTypes.items[i].template = draft.postTypes.items[i].template
          ? JSON.parse(draft.postTypes.items[i].template)
          : []

        if (get(o, `posts.items`)) {
          return (draft.postTypes.items[i].posts = draft.postTypes.items[i].posts.items.reduce(
            (ac, a) => ({
              ...ac,
              [a.id]: {
                ...a,
                featuredImage: a.featuredImage ? JSON.parse(a.featuredImage) : null,
              },
            }),
            {}
          ))
        }
      })

      draft.postTypes = draft.postTypes.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {})
    }

    // Convert forms to object structure
    if (get(draft, `forms.items`)) {
      draft.forms = draft.forms.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {})
    }

    set(draft, `mediaItems`, { items: [], nextToken: null })
  })

  return nextSite
}

export const addSite = async ({ title, ownerID, apiKey }) => {
  const result = await API.graphql(
    graphqlOperation(createSite, {
      input: { title, ownerID, apiKey },
    })
  )

  if (result?.data?.createSite) {
    result.data.createSite = transformSite(result.data.createSite)
  }

  return result
}

const siteFragment = `
  id
  title
  netlifyID
  netlifyUrl
  customDomain
  apiKey
  settings
  postTypes {
    items {
      id
      title
      slug
      template
      posts {
        items {
          id
          siteID
          slug
          postTypeID
          parentID
          status
          title
          featuredImage
          createdAt
        }
      }
    }
  }
  forms {
    items {
      id
      title
      createdAt
    }
  }
`

export const updateSite = async ({ id, title, netlifyID, netlifyUrl, settings, apiKey, customDomain }) => {
  const result = await API.graphql(
    graphqlOperation(
      `mutation UpdateSite(
        $input: UpdateSiteInput!
        $condition: ModelSiteConditionInput
      ) {
        updateSite(input: $input, condition: $condition) {
          ${siteFragment}
        }
      }
    `,
      {
        input: { id, title, netlifyID, netlifyUrl, settings: JSON.stringify(settings), apiKey, customDomain },
      }
    )
  )

  if (result?.data?.updateSite) {
    result.data.updateSite = transformSite(result.data.updateSite)
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
        }
      }
    `)
  )

  if (result?.data?.listSites) {
    result.data.listSites = result.data.listSites.items.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})
  }

  return result
}

export const getSite = async ({ siteID }) => {
  const result = await API.graphql(
    graphqlOperation(
      `
      query GetSite($id: ID!) {
        getSite(id: $id) {
          ${siteFragment}
        }
      }
    `,
      { id: siteID }
    )
  )

  if (result?.data?.getSite) {
    result.data.getSite = transformSite(result.data.getSite)
  }

  return result
}
