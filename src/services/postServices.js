import { API, graphqlOperation } from 'aws-amplify'

import { createPost, updatePost as dbUpdatePost } from '../graphql/mutations'
import { getPost as dbGetPost } from '../graphql/queries'

export const addPost = async ({ siteID, slug, postTypeID, status, title, content }) => {
  const result = await API.graphql(
    graphqlOperation(createPost, {
      input: { siteID, slug, postTypeID, status, title, content },
    })
  )

  return result
}

export const getPosts = async ({ siteID, postTypeID }, dispatch) => {
  const result = await API.graphql(
    graphqlOperation(`query ListPosts{
    listPosts(filter: {postTypeID: {eq: "${postTypeID}"}}) {
      items {
        id
        siteID
        slug
        status
        title
        content
        createdAt
        updatedAt
        postType {
          id
          title
          slug
        }
        owner
      }
      nextToken
    }
  }`)
  )

  return result
}

export const getPost = async ({ postID }) => {
  const result = await API.graphql(graphqlOperation(dbGetPost, { id: postID }))
  return result
}

export const updatePost = async ({ id, slug, status, title, content }, dispatch) => {
  const result = await API.graphql(
    graphqlOperation(dbUpdatePost, {
      input: { id, slug, status, title, content: JSON.stringify(content) },
    })
  )

  if (result?.data?.updatePost) {
    dispatch({ type: 'ADD_POST', payload: result.data.updatePost })
  }

  return result
}
