import { collectionServices } from '../services'

export const getCollection = async ({ postTypeID }, dispatch) => {
  const result = await collectionServices.getCollection({ postTypeID })

  if (result?.data?.getPostType) {
    dispatch({
      type: `ADD_COLLECTION`,
      payload: result?.data.getPostType,
    })
  }

  return result
}
