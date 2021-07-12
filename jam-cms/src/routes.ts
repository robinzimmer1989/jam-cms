export const ROUTE_APP = '/jam-cms';
export const ROUTE_SITE = '/site';
export const ROUTE_MEDIA = '/media';
export const ROUTE_POST_TYPE = '/collections';
export const ROUTE_SETTINGS_GENERAL = '/settings';
export const ROUTE_TAXONOMY = '/taxonomy';
export const ROUTE_PROFILE = '/profile';
export const ROUTE_USERS = '/users';

const getRoute = (route: String, args: any = {}) => {
  const siteID = args?.siteID || 'default';
  const base = `${ROUTE_SITE}/${siteID}`;

  switch (route) {
    case 'app':
      return ROUTE_APP;

    case 'dashboard':
      return `${ROUTE_APP}${base}`;

    case 'profile':
      return `${ROUTE_APP}${ROUTE_PROFILE}`;

    case 'users':
      return `${ROUTE_APP}${base}${ROUTE_USERS}`;

    case 'media':
      return `${ROUTE_APP}${base}${ROUTE_MEDIA}`;

    case 'collection':
      return `${ROUTE_APP}${base}${ROUTE_POST_TYPE}/${args?.postTypeID}`;

    case 'taxonomy':
      return `${ROUTE_APP}${base}${ROUTE_TAXONOMY}/${args?.taxonomyID}`;

    case 'settings-general':
      return `${ROUTE_APP}${base}${ROUTE_SETTINGS_GENERAL}`;

    default:
      return `/`;
  }
};

export default getRoute;
