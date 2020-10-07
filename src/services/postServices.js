import { API, graphqlOperation } from 'aws-amplify'

import { createPost, updatePost as dbUpdatePost, deletePost as dbDeletePost } from '../graphql/mutations'
import { getPost as dbGetPost } from '../graphql/queries'

export const addPost = async ({ siteID, slug, postTypeID, status, title, content, parentID }) => {
  const result = await API.graphql(
    graphqlOperation(createPost, {
      input: { siteID, slug, postTypeID, status, title, content, parentID },
    })
  )

  return result
}

export const getPosts = async ({ postTypeID }) => {
  const result = await API.graphql(
    graphqlOperation(`query ListPosts{
    listPosts(filter: {postTypeID: {eq: "${postTypeID}"}}) {
      items {
        id
        slug
        status
        title
        postType {
          id
          title
          slug
        }
      }
    }
  }`)
  )

  return result
}

export const getPost = async ({ postID }) => {
  const result = await API.graphql(graphqlOperation(dbGetPost, { id: postID }))

  if (result?.data?.getPost) {
    const post = result.data.getPost

    result.data.getPost = {
      ...post,
      content: post.content ? JSON.parse(post.content) : [],
    }
  }

  return result
}

export const updatePost = async ({ id, slug, status, title, content, seoTitle, seoDescription, parentID }) => {
  const jsonContent = content ? JSON.stringify(content) : null

  const result = await API.graphql(
    graphqlOperation(dbUpdatePost, {
      input: { id, slug, status, title, content: jsonContent, seoTitle, seoDescription, parentID },
    })
  )

  if (result?.data?.updatePost) {
    const post = result.data.updatePost

    result.data.updatePost = {
      ...post,
      content: post.content ? JSON.parse(post.content) : [],
    }
  }

  return result
}

export const deletePost = async ({ id }) => {
  const result = await API.graphql(
    graphqlOperation(dbDeletePost, {
      input: { id },
    })
  )

  return result
}
