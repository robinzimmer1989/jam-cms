import produce from 'immer'
import { unionBy } from 'lodash'

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
          [payload.id]: {
            ...payload,
            mediaItems: {
              items: [],
              nextToken: null,
            },
          },
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
        draft.sites = {
          ...draft.sites,
          [payload.siteID]: {
            ...draft.sites[payload.siteID],
            postTypes: {
              items: [...draft.sites[payload.siteID].postTypes.items, payload],
            },
          },
        }
        break

      /******************************
       * Posts
       ******************************/

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
