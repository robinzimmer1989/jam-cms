import { API, graphqlOperation } from 'aws-amplify'

import { createPostType } from '../graphql/mutations'

export const addCollection = async ({ siteID, slug, title }, dispatch) => {
  const result = await API.graphql(
    graphqlOperation(createPostType, {
      input: { siteID, title, slug },
    })
  )

  if (result?.data?.createPostType) {
    const {
      data: { createPostType },
    } = result

    dispatch({ type: 'ADD_COLLECTION', payload: createPostType })
  }

  return result
}
