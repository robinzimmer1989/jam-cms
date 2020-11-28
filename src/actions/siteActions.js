import { navigate } from '@reach/router'

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
  { id, title, settings, frontPage, deploymentBuildHook, deploymentBadgeImage, deploymentBadgeLink, apiKey },
  dispatch
) => {
  const result = await siteServices.updateSite({
    id,
    title,
    settings,
    frontPage,
    deploymentBuildHook,
    deploymentBadgeImage,
    deploymentBadgeLink,
    apiKey,
  })

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result })
    dispatch({ type: `ADD_EDITOR_SITE`, payload: result })
    dispatch({ type: `SET_HAS_CHANGED`, payload: false })
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
