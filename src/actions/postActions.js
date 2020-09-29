import { postServices } from '../services'

export const addPost = async ({ siteID, slug, postTypeID, status, title, content }, dispatch) => {
  const result = await postServices.addPost({ siteID, slug, postTypeID, status, title, content })

  if (result?.data?.createPost) {
    dispatch({ type: 'ADD_POST', payload: result.data.createPost })
  }

  return result
}

export const getPosts = async ({ siteID, postTypeID }, dispatch) => {
  const result = await postServices.getPosts({ siteID, postTypeID })

  if (result?.data?.listPosts) {
    dispatch({
      type: 'ADD_POSTS',
      payload: { ...result.data.listPosts, siteID, postTypeID },
    })
  }

  return result
}

export const getPost = async ({ postID }, dispatch) => {
  const result = await postServices.getPost({ postID })

  if (result?.data?.getPost) {
    const post = result.data.getPost

    const payload = {
      ...post,
      content: post.content ? JSON.parse(post.content) : [],
    }

    dispatch({
      type: 'ADD_POST',
      payload,
    })

    dispatch({
      type: 'SET_EDITOR_POST',
      payload,
    })
  }

  return result
}
