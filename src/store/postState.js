import produce from 'immer'
import { unionBy, set, get } from 'lodash'

const DEFAULT_STATE = {
  siteID: null,
  sites: {},
}

export const postState = { ...DEFAULT_STATE }

export const postReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      /******************************
       * Sites
       ******************************/
      case `ADD_SITES`:
        draft.sites = payload
        break

      case `ADD_SITE`:
        draft.siteID = payload.id
        set(draft, `sites.${payload.id}`, payload)
        break

      case `DELETE_SITE`:
        draft.siteID = null
        delete draft.sites[payload.id]
        break

      /******************************
       * Collections
       ******************************/
      case `ADD_COLLECTION`:
        set(draft, `sites.${payload.siteID}.postTypes.${payload.id}`, payload)
        break

      case `DELETE_COLLECTION`:
        delete draft.sites[payload.siteID].postTypes[payload.postTypeID]
        break

      /******************************
       * Posts
       ******************************/
      case `ADD_POST`:
        set(draft, `sites.${payload.siteID}.postTypes.${payload.postTypeID}.posts.${payload.id}`, payload)
        break

      case `DELETE_POST`:
        delete draft.sites[payload.siteID].postTypes[payload.postTypeID].posts[payload.id]
        break

      /******************************
       * Menus
       ******************************/
      case `ADD_MENU`:
        set(draft, `sites.${payload.siteID}.menus.${payload.slug}`, payload)
        break

      /******************************
       * Media Items
       ******************************/
      case `ADD_MEDIA_ITEMS`:
        draft.sites[payload.siteID].mediaItems = {
          items: unionBy(draft.sites[payload.siteID].mediaItems, payload.items, 'id'),
          nextToken: payload.nextToken || draft.sites[payload.siteID].mediaItems.nextToken,
        }
        break

      /******************************
       * Clear
       ******************************/
      case `CLEAR_POST_STATE`:
        break

      default:
    }
  })
}
