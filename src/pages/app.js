import React from 'react'
import { Router } from '@reach/router'
import { Dialog } from '@material-ui/core'

// import components
import Home from '../components/cms/pages/Home'
import Profile from '../components/cms/pages/Profile'
import CmsRouter from '../components/cms/Router'
import PrivateRoute from '../components/cms/PrivateRoute'

import { useStore } from 'store'

const App = () => {
  const [
    {
      appState: { dialog },
    },
    dispatch,
  ] = useStore()

  return (
    <>
      <Router>
        <PrivateRoute path="/app" component={Home} />
        <PrivateRoute path="/app/profile" component={Profile} />
        <PrivateRoute path="/app/site/:siteID/*" component={CmsRouter} />
      </Router>

      <Dialog
        open={dialog.open}
        fullWidth
        maxWidth={dialog.width || 'md'}
        onClose={() => dispatch({ type: 'CLOSE_DIALOG' })}
        children={dialog.component}
      />
    </>
  )
}

export default App
