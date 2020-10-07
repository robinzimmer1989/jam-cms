import { postServices } from '../services'

export const addPost = async ({ siteID, slug, postTypeID, status, title, content, parentID }, dispatch) => {
  const result = await postServices.addPost({ siteID, slug, postTypeID, status, title, content, parentID })

  if (result?.data?.createPost) {
    dispatch({ type: `ADD_POST`, payload: result.data.createPost })
  }

  return result
}

export const getPosts = async ({ siteID, postTypeID }, dispatch) => {
  const result = await postServices.getPosts({ siteID, postTypeID })

  if (result?.data?.listPosts) {
    dispatch({
      type: `ADD_POSTS`,
      payload: { ...result.data.listPosts, siteID, postTypeID },
    })
  }

  return result
}

export const getPost = async ({ site, postID }, dispatch) => {
  const result = await postServices.getPost({ postID })

  if (result?.data?.getPost) {
    dispatch({
      type: `ADD_POST`,
      payload: result.data.getPost,
    })

    dispatch({
      type: `SET_EDITOR_POST`,
      payload: result.data.getPost,
    })

    // Every time the user edits a post we need to restore the original site state,
    // because of the header + footer settings
    dispatch({
      type: `SET_EDITOR_SITE`,
      payload: site,
    })
  }

  return result
}

export const updatePost = async (
  { id, slug, status, title, content, seoTitle, seoDescription, parentID },
  dispatch
) => {
  const result = await postServices.updatePost({ id, slug, status, title, content, seoTitle, seoDescription, parentID })

  if (result?.data?.updatePost) {
    dispatch({ type: `ADD_POST`, payload: result.data.updatePost })
  }
}

export const deletePost = async ({ id }, dispatch) => {
  const result = await postServices.deletePost({ id })

  if (result?.data?.deletePost) {
    dispatch({ type: `DELETE_POST`, payload: result.data.deletePost })
  }
}
