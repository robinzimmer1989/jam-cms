import { API, graphqlOperation } from 'aws-amplify'

import {
  createMediaItem,
  updateMediaItem as dbUpdateMediaItem,
  deleteMediaItem as dbDeleteMediaItem,
} from '../graphql/mutations'

export const addMediaItem = async ({ siteID, title, mimeType, storageKey }) => {
  const result = await API.graphql(
    graphqlOperation(createMediaItem, {
      input: { siteID, title, mimeType, storageKey },
    })
  )

  return result
}

export const updateMediaItem = async ({ id, altText }) => {
  const result = await API.graphql(
    graphqlOperation(dbUpdateMediaItem, {
      input: { id, altText },
    })
  )

  return result
}

export const deleteMediaItem = async ({ id }) => {
  const result = await API.graphql(
    graphqlOperation(dbDeleteMediaItem, {
      input: { id },
    })
  )

  return result
}

export const getMediaItems = async ({ siteID }) => {
  const result = await API.graphql(
    graphqlOperation(`
      query ListMediaItems {
        listMediaItems(filter: {siteID: {eq: "${siteID}"}}) {
          items {
            id
            siteID
            title
            mimeType
            storageKey
            altText
            width
            height
            fileSize
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
