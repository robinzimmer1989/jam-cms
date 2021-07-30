import produce from 'immer';
import { set } from 'lodash';

const DEFAULT_STATE = {
  siteID: null,
  sites: {},
  activeLanguage: null,
  deploymentImage: '',
};

export const cmsState = { ...DEFAULT_STATE };

export const sitesReducer = (state: any, action: any) => {
  const { payload } = action;

  return produce(state, (draft: any) => {
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

        // Set active language if applicable
        if (payload?.languages?.defaultLanguage && !draft.activeLanguage) {
          draft.activeLanguage = payload.languages.defaultLanguage;
        }
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
        ].terms.findIndex((o: any) => o.id === payload.id);
        set(
          draft,
          `sites.${payload.siteID}.taxonomies.${payload.taxonomyID}.terms.${termIndex}`,
          payload
        );
        break;

      case `DELETE_TERM`:
        draft.sites[payload.siteID].taxonomies[payload.taxonomyID].terms = draft.sites[
          payload.siteID
        ].taxonomies[payload.taxonomyID].terms.filter((o: any) => o.id !== parseInt(payload.id));
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

      case `DELETE_POSTS`:
        payload.posts.map((o: any) => {
          delete draft.sites[payload.siteID].postTypes[o.postTypeID].posts[o.id];
        });
        break;

      /******************************
       * Language
       ******************************/
      case `SET_ACTIVE_LANGUAGE`:
        draft.activeLanguage = payload;
        break;

      case `UPDATE_LANGUAGES`:
        set(draft, `sites.${payload.siteID}.languages`, payload.languages);
        break;

      case `DELETE_LANGUAGE`:
        draft.sites[payload.siteID].languages.languages = draft.sites?.[
          payload?.siteID
        ]?.languages?.languages?.filter((o: any) => o.id !== payload?.id);

        // Reset language if active language gets deleted
        if (draft.activeLanguage === payload.slug) {
          draft.activeLanguage = 'all';
        }

        break;

      case `UPDATE_LANGUAGE_SETTINGS`:
        draft.sites[payload.siteID].languages = {
          ...draft.sites[payload.siteID].languages,
          ...payload.settings,
        };
        break;

      /******************************
       * Clear
       ******************************/
      case `CLEAR_POST_STATE`:
        draft.siteID = null;
        draft.sites = {};
        draft.activeLanguage = null;
        draft.deploymentImage = '';
        break;

      default:
    }
  });
};
