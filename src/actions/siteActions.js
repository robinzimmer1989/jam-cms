import { navigate } from 'gatsby'

import { siteServices } from '../services'
import getRoute from '../routes'

export const addSite = async ({ title, ownerID }, dispatch) => {
  const result = await siteServices.addSite({ title, ownerID })

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result })
    navigate(getRoute(`dashboard`, { siteID: result.id }))
  }

  return result
}

export const updateSite = async (
  { id, title, settings, frontPage, netlifyBuildHook, netlifyBadgeImage, netlifyBadgeLink },
  dispatch
) => {
  const result = await siteServices.updateSite({
    id,
    title,
    settings,
    frontPage,
    netlifyBuildHook,
    netlifyBadgeImage,
    netlifyBadgeLink,
  })

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result })
  }

  return result
}

export const deleteSite = async ({ id }, dispatch) => {
  const result = await siteServices.deleteSite({ id })

  if (result) {
    dispatch({ type: `DELETE_SITE`, payload: result })
  }

  return result
}

export const getSites = async (args, dispatch) => {
  const result = await siteServices.getSites()

  if (result) {
    dispatch({ type: `ADD_SITES`, payload: result })
  }

  return result
}

export const getSite = async ({ siteID }, dispatch) => {
  const result = await siteServices.getSite({ siteID })

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result })
  }

  return result
}

export const addSiteToEditor = ({ site }, dispatch) => {
  dispatch({
    type: `ADD_EDITOR_SITE`,
    payload: site,
  })
}
