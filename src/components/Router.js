import React, { useEffect, useState } from 'react'
import { Router as ReachRouter } from '@reach/router'
import Helmet from 'react-helmet'

// import app components
import Dashboard from './appPages/Dashboard'
import Media from './appPages/Media'
import Collections from './appPages/Collections'
import Collection from './appPages/Collection'
import CollectionEditor from './appPages/CollectionEditor'
import PostEditor from './appPages/PostEditor'
import Forms from './appPages/Forms'
import Form from './appPages/Form'
import GeneralSettings from './appPages/GeneralSettings'
import Admin from './appPages/Admin'
import Seo from './appPages/Seo'
import Development from './appPages/Development'

import {
  ROUTE_MEDIA,
  ROUTE_COLLECTIONS,
  ROUTE_EDITOR,
  ROUTE_FORMS,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_SETTINGS_COLLECTIONS,
  ROUTE_SETTINGS_SEO,
  ROUTE_SITE_ADMIN,
  ROUTE_DEV,
} from '../routes'
import { siteActions } from '../actions'
import { useStore } from '../store'

const Router = (props) => {
  const { siteID, theme, blocks } = props

  const [
    {
      cmsState: { sites },
    },
    dispatch,
  ] = useStore()

  const [fonts, setFonts] = useState([])

  useEffect(() => {
    const loadSite = async () => {
      await siteActions.getSite({ siteID }, dispatch)
    }

    // React was loading the site on every page change, even though the siteID never changed
    // Fixed it with adding conditional logic here
    !sites[siteID] && loadSite()
  }, [siteID])

  useEffect(() => {
    if (theme?.typography) {
      const { headlineFontFamily, paragraphFontFamily } = theme.typography

      setFonts([...new Set([headlineFontFamily, paragraphFontFamily])])
    }
  }, [theme])

  if (!sites[siteID]) {
    return null
  }

  return (
    <>
      <Helmet>
        {fonts.map((s) => (
          <link key={s} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${s}`} />
        ))}
      </Helmet>

      <ReachRouter>
        <Dashboard path="/" />
        <Media path={`${ROUTE_MEDIA}`} />
        <Collection path={`${ROUTE_COLLECTIONS}/:postTypeID`} />
        <PostEditor path={`${ROUTE_COLLECTIONS}/:postTypeID${ROUTE_EDITOR}/:postID`} theme={theme} blocks={blocks} />
        <Forms path={ROUTE_FORMS} />
        <Form path={`${ROUTE_FORMS}/:formID`} />
        <GeneralSettings path={ROUTE_SETTINGS_GENERAL} />
        <Collections path={ROUTE_SETTINGS_COLLECTIONS} />
        <CollectionEditor path={`${ROUTE_SETTINGS_COLLECTIONS}/:postTypeID`} theme={theme} blocks={blocks} />
        <Seo path={ROUTE_SETTINGS_SEO} />
        <Admin path={ROUTE_SITE_ADMIN} />
        <Development path={ROUTE_DEV} theme={theme} blocks={blocks} />
      </ReachRouter>
    </>
  )
}

export default Router
