import React, { useEffect, useState } from 'react'
import { Router as ReachRouter } from '@reach/router'
import Helmet from 'react-helmet'

// import app components
import Dashboard from './pages/Dashboard'
import Media from './pages/Media'
import Collection from './pages/Collection'
import Editor from './pages/Editor'
import Forms from './pages/Forms'
import Form from './pages/Form'
import SettingsGeneral from './pages/SettingsGeneral'
import SettingsCollections from './pages/SettingsCollections'
import SettingsSeo from './pages/SettingsSeo'
import SettingsTheme from './pages/SettingsTheme'

import {
  ROUTE_MEDIA,
  ROUTE_COLLECTIONS,
  ROUTE_EDITOR,
  ROUTE_FORMS,
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
      cmsState: { sites },
    },
    dispatch,
  ] = useStore()

  const [fonts, setFonts] = useState([])

  useEffect(() => {
    const loadSite = async () => {
      const result = await siteActions.getSite({ siteID }, dispatch)

      if (result?.data?.getSite?.settings?.typography) {
        const { headlineFontFamily, paragraphFontFamily } = result?.data?.getSite?.settings?.typography

        setFonts([...new Set([headlineFontFamily, paragraphFontFamily])])
      }
    }

    loadSite()
  }, [siteID])

  if (!sites[siteID]) {
    return null
  }

  return (
    <>
      <Helmet>
        {fonts.map(s => (
          <link key={s} rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${s}`} />
        ))}
      </Helmet>

      <ReachRouter>
        <Dashboard path="/" />
        <Media path={`${ROUTE_MEDIA}`} />
        <Collection path={`${ROUTE_COLLECTIONS}/:postTypeID`} />
        <Editor path={`${ROUTE_COLLECTIONS}/:postTypeID${ROUTE_EDITOR}/:postID`} />
        <Forms path={ROUTE_FORMS} />
        <Form path={`${ROUTE_FORMS}/:formID`} />
        <SettingsGeneral path={ROUTE_SETTINGS_GENERAL} />
        <SettingsCollections path={ROUTE_SETTINGS_COLLECTIONS} />
        <SettingsSeo path={ROUTE_SETTINGS_SEO} />
        <SettingsTheme path={ROUTE_SETTINGS_THEME} />
      </ReachRouter>
    </>
  )
}

export default Router
