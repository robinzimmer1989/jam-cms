import { API, graphqlOperation } from 'aws-amplify'

import { createPostType } from '../graphql/mutations'

export const addCollection = async ({ siteID, slug, title }, dispatch) => {
  const result = await API.graphql(
    graphqlOperation(createPostType, {
      input: { siteID, title, slug },
    })
  )

  if (result?.data?.createPostType) {
    dispatch({ type: `ADD_COLLECTION`, payload: result.data.createPostType })
  }

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
