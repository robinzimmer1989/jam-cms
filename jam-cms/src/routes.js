export const ROUTE_APP = '/jam-cms';
export const ROUTE_SITE = '/site';
export const ROUTE_MEDIA = '/media';
export const ROUTE_COLLECTIONS = '/collections';
export const ROUTE_SETTINGS_GENERAL = '/settings';
export const ROUTE_SETTINGS_SEO = '/settings/seo';
export const ROUTE_SETTINGS_COLLECTIONS = '/settings/collections';
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

    case 'collections':
      return `${ROUTE_APP}${base}${ROUTE_COLLECTIONS}`;

    case 'collection':
      return `${ROUTE_APP}${base}${ROUTE_COLLECTIONS}/${args?.postTypeID}`;

    case 'options':
      return `${ROUTE_APP}${base}${ROUTE_OPTIONS}`;

    case 'settings-general':
      return `${ROUTE_APP}${base}${ROUTE_SETTINGS_GENERAL}`;

    case 'settings-seo':
      return `${ROUTE_APP}${base}${ROUTE_SETTINGS_SEO}`;

    case 'settings-collections':
      return `${ROUTE_APP}${base}${ROUTE_SETTINGS_COLLECTIONS}`;

    default:
      return `/`;
  }
};

export default getRoute;
