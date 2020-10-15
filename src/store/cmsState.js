import produce from 'immer'
import { unionBy, set } from 'lodash'

const DEFAULT_STATE = {
  siteID: null,
  sites: {},
}

export const cmsState = { ...DEFAULT_STATE }

export const sitesReducer = (state, action) => {
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
        delete draft.sites[payload.siteID].postTypes[payload.id]
        break

      /******************************
       * Collections
       ******************************/
      case `ADD_FORM`:
        set(draft, `sites.${payload.siteID}.forms.${payload.id}`, payload)
        break

      case `DELETE_FORM`:
        delete draft.sites[payload.siteID].forms[payload.id]
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
       * Media Items
       ******************************/
      case `ADD_MEDIA_ITEM`:
        draft.sites[payload.siteID].mediaItems = {
          items: unionBy([payload.item], draft.sites[payload.siteID].mediaItems.items, 'id'),
          nextToken: draft.sites[payload.siteID].mediaItems.nextToken,
        }
        break

      case `ADD_MEDIA_ITEMS`:
        draft.sites[payload.siteID].mediaItems = {
          items: unionBy(draft.sites[payload.siteID].mediaItems.items, payload.items, 'id'),
          nextToken: payload.nextToken,
        }
        break

      case `DELETE_MEDIA_ITEM`:
        draft.sites[payload.siteID].mediaItems.items = draft.sites[payload.siteID].mediaItems.items.filter(
          o => o.id !== payload.id
        )
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
