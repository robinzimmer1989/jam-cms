import React from 'react'
import { Router } from '@reach/router'
import { Dialog } from '@material-ui/core'

// import pages
import Details from '../container/Details'
import Home from '../container/Home'
import Login from '../container/Login'
import SignUp from '../container/SignUp'

// import components
import CmsRouter from '../components/cms/Router'
import PrivateRoute from '../components/PrivateRoute'
import { useStore } from '../store'

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
        <PrivateRoute path="/app/profile" component={Details} />
        <PrivateRoute path="/app/site/:siteID/*" component={CmsRouter} />

        <Login path="/app/login" />
        <SignUp path="/app/signup" />
      </Router>

      <Dialog
        open={dialog.open}
        fullWidth
        maxWidth={dialog.width || 'md'}
        onClose={() => dispatch({ type: 'CLOSE_DIALOG' })}
      >
        {dialog.component}
      </Dialog>
    </>
  )
}

export default App
