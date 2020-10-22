import React from 'react'
import { Router } from '@reach/router'
import { Modal } from 'antd'

// import components
import Home from 'components/appPages/Home'
import Profile from 'components/appPages/Profile'
import CmsRouter from 'components/Router'
import PrivateRoute from 'components/PrivateRoute'

import { ROUTE_APP, ROUTE_PROFILE, ROUTE_SITE } from 'routes'
import { useStore } from 'store'

const App = () => {
  const [
    {
      globalState: { dialog },
    },
    dispatch,
  ] = useStore()

  return (
    <>
      <Router>
        <PrivateRoute path={`${ROUTE_APP}`} component={Home} />
        <PrivateRoute path={`${ROUTE_APP}${ROUTE_PROFILE}`} component={Profile} />
        <PrivateRoute path={`${ROUTE_APP}${ROUTE_SITE}/:siteID/*`} component={CmsRouter} />
      </Router>

      <Modal
        title={dialog.title}
        visible={dialog.open}
        onCancel={() => dispatch({ type: 'CLOSE_DIALOG' })}
        children={dialog.component}
        width={dialog.width}
        footer={null}
      />
    </>
  )
}

export default App
