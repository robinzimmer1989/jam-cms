import { mediaServices, storageServices } from '../services'

export const uploadMediaItem = async ({ siteID, file }, dispatch) => {
  const { name: title, type: mimeType } = file

  const { key: storageKey } = await storageServices.uploadFile({ siteID, file })

  const result = await mediaServices.addMediaItem({ siteID, title, mimeType, storageKey })

  if (result?.data?.createMediaItem) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: { item: result.data.createMediaItem, siteID } })
  }

  return result
}

export const getMediaItems = async ({ siteID, nextToken }, dispatch) => {
  const result = await mediaServices.getMediaItems({ siteID, nextToken })

  if (result?.data?.listMediaItems) {
    dispatch({ type: `ADD_MEDIA_ITEMS`, payload: { ...result.data.listMediaItems, siteID } })
  }

  return result
}

export const updateMediaItem = async ({ siteID, id, altText }, dispatch) => {
  const result = await mediaServices.updateMediaItem({ id, altText })

  if (result?.data?.updateMediaItem) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: { item: result.data.updateMediaItem, siteID } })
  }

  return result
}

export const deleteMediaItem = async ({ id, storageKey, siteID }, dispatch) => {
  await storageServices.deleteFile({ storageKey })

  const result = await mediaServices.deleteMediaItem({ id })

  if (result?.data?.deleteMediaItem) {
    dispatch({ type: `DELETE_MEDIA_ITEM`, payload: { id, siteID } })
  }

  return result
}
