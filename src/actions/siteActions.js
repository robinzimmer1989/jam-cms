import { navigate } from 'gatsby'

import { siteServices, collectionServices, netlifyServices, postServices } from 'services'
import { menuActions } from 'actions'

export const addSite = async ({ title, ownerID }, dispatch) => {
  const result = await siteServices.addSite({ title, ownerID })

  if (result?.data?.createSite) {
    const siteID = result.data.createSite.id

    dispatch({ type: `ADD_SITE`, payload: result.data.createSite })

    // Add default collection 'Page'
    const collectionResult = await collectionServices.addCollection({ title: 'Page', slug: '/', siteID }, dispatch)

    // Add default page 'Home'
    if (collectionResult?.data?.createPostType) {
      await postServices.addPost({
        siteID,
        postTypeID: collectionResult.data.createPostType.id,
        title: 'Home',
        slug: '/',
        status: 'publish',
      })
    }

    // Create site on Netlify
    const netlifyResult = await netlifyServices.addSite({ siteID })

    if (netlifyResult?.id) {
      const { id: netlifyID, ssl_url: netlifyUrl } = netlifyResult

      // Update site with Netlify info
      const updateSiteResult = await siteServices.updateSite({ id: siteID, title, netlifyID, netlifyUrl })

      if (updateSiteResult?.data?.updateSite) {
        dispatch({ type: `ADD_SITE`, payload: updateSiteResult.data.updateSite })

        return updateSiteResult
      }

      navigate(`/app/site/${siteID}`)
    }
  }

  return result
}

export const updateSite = async ({ id, title, settings, menus }, dispatch) => {
  const result = await siteServices.updateSite({ id, title, settings })

  if (result?.data?.updateSite) {
    dispatch({ type: `ADD_SITE`, payload: result.data.updateSite })
  }

  //TODO: Check if menus have changed or alternatively remove single menu items (see other TODO)
  if (menus) {
    await Promise.all(
      Object.keys(menus).map(async key => {
        const menu = menus[key]

        if (menu.id) {
          await menuActions.updateMenu(menu, dispatch)
        } else {
          await menuActions.addMenu({ siteID: id, slug: key, content: menu.content }, dispatch)
        }
      })
    )
  }

  return result
}

export const deleteSite = async ({ id, netlifyID }, dispatch) => {
  netlifyID && (await netlifyServices.deleteSite({ netlifyID }))

  const result = await siteServices.deleteSite({ id })

  if (result?.data?.deleteSite) {
    dispatch({ type: `DELETE_SITE`, payload: result.data.deleteSite })

    return result
  }

  return false
}

export const getSites = async (args, dispatch) => {
  const result = await siteServices.getSites()

  if (result?.data?.listSites) {
    dispatch({ type: `ADD_SITES`, payload: result.data.listSites })
  }
}

export const getSite = async ({ siteID }, dispatch) => {
  const result = await siteServices.getSite({ siteID })

  if (result?.data?.getSite) {
    dispatch({ type: `ADD_SITE`, payload: result.data.getSite })
  }
}

export const deploySite = async ({ netlifyID }, dispatch) => {
  const result = await netlifyServices.deploySite({ netlifyID })

  if (result?.deploy_id) {
    dispatch({ type: `UPDATE_NETLIFY_DEPLOY_ID`, payload: result.deploy_id })
  }
}

export const addSiteToEditor = ({ site }, dispatch) => {
  dispatch({
    type: `SET_EDITOR_SITE`,
    payload: site,
  })
}
