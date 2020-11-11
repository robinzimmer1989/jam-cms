import { postServices } from '../services'

export const addPost = async ({ siteID, slug, postTypeID, status, title, content, parentID }, dispatch) => {
  const result = await postServices.addPost({ siteID, slug, postTypeID, status, title, content, parentID })

  if (result) {
    dispatch({ type: `ADD_POST`, payload: result })
  }

  return result
}

export const getPost = async ({ siteID, postID }, dispatch) => {
  const result = await postServices.getPost({ siteID, postID })

  if (result) {
    dispatch({
      type: `ADD_POST`,
      payload: result,
    })
    dispatch({
      type: `ADD_EDITOR_POST`,
      payload: result,
    })
  }

  return result
}

export const updatePost = async (
  { siteID, id, slug, status, title, content, seoTitle, seoDescription, parentID, featuredImage },
  dispatch
) => {
  const result = await postServices.updatePost({
    siteID,
    id,
    slug,
    status,
    title,
    content,
    seoTitle,
    seoDescription,
    parentID,
    featuredImage,
  })

  if (result) {
    dispatch({ type: `ADD_POST`, payload: result })
  }
}

export const deletePost = async ({ siteID, id }, dispatch) => {
  const result = await postServices.deletePost({ siteID, id })

  if (result) {
    dispatch({ type: `DELETE_POST`, payload: result })
  }
}
