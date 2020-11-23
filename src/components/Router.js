import React, { useEffect } from 'react'
import { Router as ReachRouter } from '@reach/router'

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
import Editors from './appPages/Editors'
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
  ROUTE_SITE_EDITORS,
  ROUTE_DEV,
} from '../routes'
import { siteActions } from '../actions'
import { useStore } from '../store'

const Router = (props) => {
  const { siteID = 'default', theme, blocks } = props

  const [
    {
      authState: { authUser },
      cmsState: { sites },
    },
    dispatch,
  ] = useStore()

  useEffect(() => {
    const loadSite = async () => {
      await siteActions.getSite({ siteID }, dispatch)
    }

    loadSite()
  }, [siteID])

  if (!sites[siteID]) {
    return null
  }

  return (
    <>
      <ReachRouter>
        <Dashboard path="/" />
        <Media path={`${ROUTE_MEDIA}`} />
        <Collection path={`${ROUTE_COLLECTIONS}/:postTypeID`} />
        <PostEditor path={`${ROUTE_COLLECTIONS}/:postTypeID${ROUTE_EDITOR}/:postID`} theme={theme} blocks={blocks} />
        <Forms path={ROUTE_FORMS} />
        <Form path={`${ROUTE_FORMS}/:formID`} />
        <Seo path={ROUTE_SETTINGS_SEO} />
        {authUser?.capabilities?.manage_options && <GeneralSettings path={ROUTE_SETTINGS_GENERAL} />}
        {authUser?.capabilities?.manage_options && <Collections path={ROUTE_SETTINGS_COLLECTIONS} />}
        {authUser?.capabilities?.manage_options && (
          <CollectionEditor path={`${ROUTE_SETTINGS_COLLECTIONS}/:postTypeID`} theme={theme} blocks={blocks} />
        )}
        {authUser?.capabilities?.list_users && <Editors path={ROUTE_SITE_EDITORS} />}

        {/* {process.env.NODE_ENV === 'development' && <Development path={ROUTE_DEV} theme={theme} blocks={blocks} />} */}
      </ReachRouter>
    </>
  )
}

export default Router
