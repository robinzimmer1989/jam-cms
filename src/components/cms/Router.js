import React, { useEffect } from 'react'
import { Router as ReachRouter } from '@reach/router'
import { navigate } from 'gatsby'

// import app components
import Collections from './pages/Collections'
import Dashboard from './pages/Dashboard'
import Media from './pages/Media'
import Settings from './pages/Settings'
import Editor from './editor'

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
      <Media path="/media" />
      <Collections path="/collections/:postTypeID" />
      <Editor path="/collections/:postTypeID/:postID" />
      <Settings path="/settings" />
    </ReachRouter>
  )
}

export default Router
