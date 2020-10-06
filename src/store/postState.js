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
        draft.sites = {
          ...draft.sites,
          ...payload.reduce((obj, item) => {
            obj[item.id] = item
            return obj
          }, {}),
        }
        break

      case `ADD_SITE`:
        draft.siteID = payload.id

        draft.sites = {
          ...draft.sites,
          [payload.id]: payload,
        }
        break

      case `DELETE_SITE`:
        draft.siteID = null
        delete draft.sites[payload.id]
        break

      /******************************
       * Collections
       ******************************/

      case `ADD_COLLECTION`:
        const collectionIndex = draft.sites[payload.siteID].postTypes.items.findIndex(o => o.id === payload.id)
        set(draft, `sites.${payload.siteID}.postTypes.items.${collectionIndex}`, payload)
        break

      /******************************
       * Posts
       ******************************/
      case `ADD_POST`:
        const postTypeIndex = draft.sites[payload.siteID].postTypes.items.findIndex(o => o.id === payload.postTypeID)
        console.log(postTypeIndex)
        const path = `sites${payload.siteID}.postTypes.items.${postTypeIndex}.posts.items`

        if (get(draft, path)) {
          set(draft, path, [payload, ...path])
        } else {
          set(draft, path, [payload])
        }

        break

      /******************************
       * Menus
       ******************************/
      case `ADD_MENU`:
        draft.sites[payload.siteID].menus = {
          items: unionBy(draft.sites[payload.siteID].menus, [payload], 'id'),
          nextToken: payload.nextToken || draft.sites[payload.siteID].mediaItems.nextToken,
        }
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
