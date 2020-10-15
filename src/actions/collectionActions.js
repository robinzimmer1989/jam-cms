import { collectionServices } from '../services'

// export const getCollection = async ({ postTypeID }, dispatch) => {
//   const result = await collectionServices.getCollection({ postTypeID })

//   if (result?.data?.getPostType) {
//     dispatch({
//       type: `ADD_COLLECTION`,
//       payload: result?.data.getPostType,
//     })
//   }

//   return result
// }

export const addCollection = async ({ siteID, title, slug }, dispatch) => {
  const result = await collectionServices.addCollection({ siteID, title, slug })

  if (result?.data?.createPostType) {
    dispatch({
      type: `ADD_COLLECTION`,
      payload: result?.data.createPostType,
    })
  }

  return result
}

export const updateCollection = async ({ siteID, id, title, slug, template }, dispatch) => {
  const result = await collectionServices.updateCollection({ siteID, id, title, slug, template })

  if (result?.data?.updatePostType) {
    dispatch({
      type: `ADD_COLLECTION`,
      payload: result?.data.updatePostType,
    })
  }

  return result
}

export const deleteCollection = async ({ id }, dispatch) => {
  const result = await collectionServices.deleteCollection({ id })

  if (result?.data?.deletePostType) {
    dispatch({
      type: `DELETE_COLLECTION`,
      payload: result?.data.deletePostType,
    })
  }

  return result
}
