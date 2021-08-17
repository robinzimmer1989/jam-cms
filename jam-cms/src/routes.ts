export const ROUTE_BASE = '/jam-cms';
export const ROUTE_APP = '/jam-cms/app';
export const ROUTE_MEDIA = '/media';
export const ROUTE_POST_TYPE = '/collections';
export const ROUTE_SETTINGS_GENERAL = '/settings';
export const ROUTE_TAXONOMY = '/taxonomy';
export const ROUTE_PROFILE = '/profile';
export const ROUTE_USERS = '/users';

const getRoute = (route: String, args: any = {}) => {
  switch (route) {
    case 'app':
      return ROUTE_APP;

    case 'dashboard':
      return `${ROUTE_APP}`;

    case 'profile':
      return `${ROUTE_APP}${ROUTE_PROFILE}`;

    case 'users':
      return `${ROUTE_APP}${ROUTE_USERS}`;

    case 'media':
      return `${ROUTE_APP}${ROUTE_MEDIA}`;

    case 'collection':
      return `${ROUTE_APP}${ROUTE_POST_TYPE}/${args?.postTypeID}`;

    case 'taxonomy':
      return `${ROUTE_APP}${ROUTE_TAXONOMY}/${args?.taxonomyID}`;

    case 'settings-general':
      return `${ROUTE_APP}${ROUTE_SETTINGS_GENERAL}`;

    default:
      return `/`;
  }
};

export default getRoute;
