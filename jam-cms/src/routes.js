export const ROUTE_APP = '/jam-cms';
export const ROUTE_SITE = '/site';
export const ROUTE_MEDIA = '/media';
export const ROUTE_POST_TYPE = '/collections';
export const ROUTE_SETTINGS_GENERAL = '/settings';
export const ROUTE_SETTINGS_POST_TYPES = `${ROUTE_SETTINGS_GENERAL}/post-types`;
export const ROUTE_SETTINGS_TAXONOMIES = `${ROUTE_SETTINGS_GENERAL}/taxonomies`;
export const ROUTE_TAXONOMY = '/taxonomy';
export const ROUTE_PROFILE = '/profile';
export const ROUTE_FORMS = '/forms';
export const ROUTE_FORM = '/form';
export const ROUTE_EDITORS = '/editors';
export const ROUTE_OPTIONS = '/options';

const getRoute = (route, args) => {
  const siteID = args?.siteID || 'default';
  const base = `${ROUTE_SITE}/${siteID}`;

  switch (route) {
    case 'app':
      return ROUTE_APP;

    case 'dashboard':
      return `${ROUTE_APP}${base}`;

    case 'profile':
      return `${ROUTE_APP}${ROUTE_PROFILE}`;

    case 'editors':
      return `${ROUTE_APP}${base}${ROUTE_EDITORS}`;

    case 'media':
      return `${ROUTE_APP}${base}${ROUTE_MEDIA}`;

    case 'collection':
      return `${ROUTE_APP}${base}${ROUTE_POST_TYPE}/${args?.postTypeID}`;

    case 'taxonomy':
      return `${ROUTE_APP}${base}${ROUTE_TAXONOMY}/${args?.taxonomyID}`;

    case 'options':
      return `${ROUTE_APP}${base}${ROUTE_OPTIONS}`;

    case 'settings-general':
      return `${ROUTE_APP}${base}${ROUTE_SETTINGS_GENERAL}`;

    case 'settings-post-types':
      return `${ROUTE_APP}${base}${ROUTE_SETTINGS_POST_TYPES}`;

    case 'settings-taxonomies':
      return `${ROUTE_APP}${base}${ROUTE_SETTINGS_TAXONOMIES}`;

    default:
      return `/`;
  }
};

export default getRoute;
