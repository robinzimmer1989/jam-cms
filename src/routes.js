export const ROUTE_SIGN_IN = `/sign-in`
export const ROUTE_SIGN_UP = `/sign-up`
export const ROUTE_APP = `/app`
export const ROUTE_SITE = `/site`
export const ROUTE_MEDIA = `/media`
export const ROUTE_COLLECTIONS = `/collections`
export const ROUTE_EDITOR = `/editor`
export const ROUTE_SETTINGS_GENERAL = `/settings`
export const ROUTE_SETTINGS_THEME = `/settings/theme`
export const ROUTE_SETTINGS_SEO = `/settings/seo`
export const ROUTE_SETTINGS_COLLECTIONS = `/settings/collections`
export const ROUTE_PROFILE = `/profile`

const getRoute = (route, args) => {
  switch (route) {
    case `sign-up`:
      return ROUTE_SIGN_UP

    case `sign-in`:
      return ROUTE_SIGN_IN

    case `app`:
      return ROUTE_APP

    case `dashboard`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}`

    case `media`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_MEDIA}`

    case `collections`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_COLLECTIONS}`

    case `collection`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_COLLECTIONS}/${args?.postTypeID}`

    case `editor`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_COLLECTIONS}/${args?.postTypeID}${ROUTE_EDITOR}/${args?.postID}`

    case `settings-general`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_SETTINGS_GENERAL}`

    case `settings-theme`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_SETTINGS_THEME}`

    case `settings-seo`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_SETTINGS_SEO}`

    case `settings-collections`:
      return `${ROUTE_APP}${ROUTE_SITE}/${args?.siteID}${ROUTE_SETTINGS_COLLECTIONS}`

    default:
      return `/`
  }
}

export default getRoute
