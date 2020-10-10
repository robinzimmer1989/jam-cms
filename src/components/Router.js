import React, { useEffect } from 'react'
import { Router as ReachRouter } from '@reach/router'

// import app components
import Dashboard from './pages/Dashboard'
import Media from './pages/Media'
import Collection from './pages/Collection'
import Editor from './pages/Editor'
import SettingsGeneral from './pages/SettingsGeneral'
import SettingsCollections from './pages/SettingsCollections'
import SettingsSeo from './pages/SettingsSeo'
import SettingsTheme from './pages/SettingsTheme'

import {
  ROUTE_MEDIA,
  ROUTE_COLLECTIONS,
  ROUTE_EDITOR,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_SETTINGS_COLLECTIONS,
  ROUTE_SETTINGS_SEO,
  ROUTE_SETTINGS_THEME,
} from 'routes'
import { siteActions } from 'actions'
import { useStore } from 'store'

const Router = props => {
  const { siteID } = props

  const [
    {
      sitesState: { sites },
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
      <SettingsGeneral path={ROUTE_SETTINGS_GENERAL} />
      <SettingsCollections path={ROUTE_SETTINGS_COLLECTIONS} />
      <SettingsSeo path={ROUTE_SETTINGS_SEO} />
      <SettingsTheme path={ROUTE_SETTINGS_THEME} />
    </ReachRouter>
  )
}

export default Router
