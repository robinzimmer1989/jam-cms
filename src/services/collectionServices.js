import { API, graphqlOperation } from 'aws-amplify'
import produce from 'immer'
import { get } from 'lodash'

import { deletePostType } from '../graphql/mutations'

const collectionFragment = `
  id
  title
  slug
  template
  siteID
  posts {
    items {
      id
      siteID
      slug
      postTypeID
      parentID
      status
      title
      createdAt
    }
  }
`

export const addCollection = async ({ siteID, slug, title }) => {
  const result = await API.graphql(
    graphqlOperation(
      `
    mutation CreatePostType(
      $input: CreatePostTypeInput!
      $condition: ModelPostTypeConditionInput
    ) {
      createPostType(input: $input, condition: $condition) {
        ${collectionFragment}
      }
    }
  `,
      {
        input: { siteID, title, slug },
      }
    )
  )

  if (result?.data?.createPostType) {
    const nextPostType = produce(result.data.createPostType, draft => {
      draft.posts = {}
      draft.template = []
      return draft
    })

    result.data.createPostType = nextPostType
  }

  return result
}

export const updateCollection = async ({ id, siteID, title, slug, template }) => {
  const jsonTemplate = template ? JSON.stringify(template) : null

  const result = await API.graphql(
    graphqlOperation(
      `
      mutation UpdatePostType(
        $input: UpdatePostTypeInput!
        $condition: ModelPostTypeConditionInput
      ) {
        updatePostType(input: $input, condition: $condition) {
          ${collectionFragment}
        }
      }
    `,
      {
        input: { id, siteID, title, slug, template: jsonTemplate },
      }
    )
  )

  if (result?.data?.updatePostType) {
    const nextPostType = produce(result.data.updatePostType, draft => {
      if (get(draft, `posts.items`)) {
        draft.posts = draft.posts.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {})
        draft.template = draft.template ? JSON.parse(draft.template) : []
      }

      return draft
    })

    result.data.updatePostType = nextPostType
  }

  return result
}

export const deleteCollection = async ({ id }) => {
  const result = await API.graphql(
    graphqlOperation(deletePostType, {
      input: { id },
    })
  )

  return result
}
