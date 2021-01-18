import produce from 'immer';
import { unionBy, set, get } from 'lodash';

const DEFAULT_STATE = {
  siteID: null,
  sites: {},
  deploymentImage: '',
};

export const cmsState = { ...DEFAULT_STATE };

export const sitesReducer = (state, action) => {
  const { payload } = action;

  return produce(state, (draft) => {
    switch (action.type) {
      case `SET_DEPLOYMENT_IMAGE`:
        draft.deploymentImage = payload;
        break;

      /******************************
       * Sites
       ******************************/
      case `ADD_SITES`:
        draft.sites = payload;
        break;

      case `ADD_SITE`:
        draft.siteID = payload.id;
        set(draft, `sites.${payload.id}`, payload);
        break;

      case `ADD_SITE_SETTING`:
        set(draft, `sites.${payload.id}.${payload.key}`, payload.value);
        break;

      case `DELETE_SITE`:
        draft.siteID = null;
        delete draft.sites[payload.id];
        break;

      /******************************
       * Collections
       ******************************/
      case `ADD_COLLECTION`:
        set(draft, `sites.${payload.siteID}.postTypes.${payload.id}`, payload);
        break;

      case `UPDATE_COLLECTION`:
        set(draft, `sites.${payload.siteID}.postTypes.${payload.id}`, payload);
        break;

      case `DELETE_COLLECTION`:
        delete draft.sites[payload.siteID].postTypes[payload.id];
        break;

      /******************************
       * Taxonomies
       ******************************/
      case `ADD_TAXONOMY`:
        set(draft, `sites.${payload.siteID}.taxonomies.${payload.id}`, payload);
        break;

      case `UPDATE_TAXONOMY`:
        set(draft, `sites.${payload.siteID}.taxonomies.${payload.id}`, payload);
        break;

      case `DELETE_TAXONOMY`:
        delete draft.sites[payload.siteID].taxonomies[payload.id];
        break;

      /******************************
       * Terms
       ******************************/
      case `ADD_TERM`:
        draft.sites[payload.siteID].taxonomies[payload.taxonomyID].terms.push(payload);
        break;

      case `UPDATE_TERM`:
        const termIndex = draft.sites[payload.siteID].taxonomies[
          payload.taxonomyID
        ].terms.findIndex((o) => o.id === payload.id);
        set(
          draft,
          `sites.${payload.siteID}.taxonomies.${payload.taxonomyID}.terms.${termIndex}`,
          payload
        );
        break;

      case `DELETE_TERM`:
        draft.sites[payload.siteID].taxonomies[payload.taxonomyID].terms = draft.sites[
          payload.siteID
        ].taxonomies[payload.taxonomyID].terms.filter((o) => o.id !== parseInt(payload.id));
        break;

      /******************************
       * Forms
       ******************************/
      case `ADD_FORM`:
        set(draft, `sites.${payload.siteID}.forms.${payload.id}`, payload);
        break;

      case `DELETE_FORM`:
        delete draft.sites[payload.siteID].forms[payload.id];
        break;

      /******************************
       * Posts
       ******************************/
      case `ADD_POST`:
        set(
          draft,
          `sites.${payload.siteID}.postTypes.${payload.postTypeID}.posts.${payload.id}`,
          payload
        );
        break;

      case `DELETE_POST`:
        delete draft.sites[payload.siteID].postTypes[payload.postTypeID].posts[payload.id];
        break;

      /******************************
       * Media Items
       ******************************/
      case `ADD_MEDIA_ITEM`:
        draft.sites[payload.siteID].mediaItems = {
          items: unionBy([payload], draft.sites[payload.siteID].mediaItems.items, 'id'),
          page: draft.sites[payload.siteID].mediaItems.page,
        };
        break;

      case `ADD_MEDIA_ITEMS`:
        draft.sites[payload.siteID].mediaItems = {
          items: unionBy(draft.sites[payload.siteID].mediaItems.items, payload.items, 'id'),
          page: payload.page,
        };
        break;

      case `DELETE_MEDIA_ITEM`:
        draft.sites[payload.siteID].mediaItems.items = draft.sites[
          payload.siteID
        ].mediaItems.items.filter((o) => o.id !== parseInt(payload.id));
        break;

      /******************************
       * Users
       ******************************/
      case `ADD_USER`:
        draft.sites[payload.siteID].users = {
          items: unionBy([payload], draft.sites[payload.siteID].users.items, 'id'),
          page: draft.sites[payload.siteID].users.page,
        };
        break;

      case `ADD_USERS`:
        draft.sites[payload.siteID].users = {
          items: unionBy(draft.sites[payload.siteID].users.items, payload.items, 'id'),
          page: payload.page,
        };
        break;

      case `DELETE_USER`:
        draft.sites[payload.siteID].users.items = draft.sites[payload.siteID].users.items.filter(
          (o) => o.id !== payload.id
        );
        break;

      /******************************
       * Clear
       ******************************/
      case `CLEAR_POST_STATE`:
        draft.siteID = null;
        draft.sites = {};
        break;

      default:
    }
  });
};
