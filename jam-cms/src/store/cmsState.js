import produce from 'immer';
import { unionBy, set } from 'lodash';

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
      case `UPDATE_COLLECTION`:
        set(draft, `sites.${payload.siteID}.postTypes.${payload.id}`, payload);
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
