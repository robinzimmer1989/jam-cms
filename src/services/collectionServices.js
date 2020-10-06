import { API, graphqlOperation } from 'aws-amplify'

import { createPostType, updatePostType } from '../graphql/mutations'

export const addCollection = async ({ siteID, slug, title }) => {
  const result = await API.graphql(
    graphqlOperation(createPostType, {
      input: { siteID, title, slug },
    })
  )

  return result
}

export const updateCollection = async ({ id, siteID, slug, title }) => {
  const result = await API.graphql(
    graphqlOperation(updatePostType, {
      input: { id, siteID, title, slug },
    })
  )

  return result
}

export const getCollection = async ({ postTypeID }) => {
  const result = await API.graphql(
    graphqlOperation(
      `
      query GetPostType($id: ID!) {
        getPostType(id: $id) {
          id
          siteID
          title
          slug
          posts {
            items {
              id
              siteID
              slug
              postTypeID
              status
              title
            }
          }
        }
      }
    `,
      { id: postTypeID }
    )
  )

  return result
}
