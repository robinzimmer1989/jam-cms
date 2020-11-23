import axios from 'axios'
import { navigate } from 'gatsby'

import { db } from '.'
import { auth } from '../utils'
import getRoute from '../routes'

export const addMediaItem = async ({ siteID, file }) => {
  const user = auth.getUser()

  if (!user?.token) {
    auth.logout(() => navigate(getRoute(`sign-in`)))
  }

  const formData = new FormData()
  formData.append('file', file)

  let result = await axios.post(
    `${process.env.GATSBY_CMS_SOURCE}/wp-json/gcms/v1/createMediaItem?siteID=${siteID}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
    }
  )

  const { data, status } = result

  if (status === 200) {
    return data
  }
}

export const updateMediaItem = async ({ siteID, id, altText }) => {
  let result = await db('updateMediaItem', { siteID, id, altText })
  return result
}

export const deleteMediaItem = async ({ siteID, id }) => {
  let result = await db('deleteMediaItem', { siteID, id })
  return result
}

export const getMediaItems = async ({ siteID, page = null, limit = 20 }) => {
  let result = await db('getMediaItems', { siteID, page, limit })
  return result
}
