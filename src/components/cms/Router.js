import React, { useEffect } from 'react'
import { Router as ReachRouter } from '@reach/router'

// import app components
import Dashboard from './pages/Dashboard'
import Media from './pages/Media'
import Collection from './pages/Collection'
import Editor from './pages/Editor'
import Settings from './pages/Settings'

import { ROUTE_MEDIA, ROUTE_COLLECTIONS, ROUTE_EDITOR, ROUTE_SETTINGS } from 'routes'
import { siteActions } from 'actions'
import { useStore } from 'store'

const Router = props => {
  const { siteID } = props

  const [
    {
      postState: { sites },
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
    <ReachRouter>
      <Dashboard path="/" />
      <Media path={`${ROUTE_MEDIA}`} />
      <Collection path={`${ROUTE_COLLECTIONS}/:postTypeID`} />
      <Editor path={`${ROUTE_COLLECTIONS}/:postTypeID${ROUTE_EDITOR}/:postID`} />
      <Settings path={ROUTE_SETTINGS} />
    </ReachRouter>
  )
}

export default Router
