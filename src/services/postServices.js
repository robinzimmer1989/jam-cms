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

export const updatePost = async ({ id, slug, status, title, content, seoTitle, seoDescription }, dispatch) => {
  const result = await API.graphql(
    graphqlOperation(dbUpdatePost, {
      input: { id, slug, status, title, content: JSON.stringify(content), seoTitle, seoDescription },
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
