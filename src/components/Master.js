import React from 'react'
import { Router } from '@reach/router'
import { Modal } from 'antd'

// import components
import Home from './appPages/Home'
import Profile from './appPages/Profile'
import SignIn from './appPages/SignIn'
import CmsRouter from './Router'
import PrivateRoute from './PrivateRoute'

import { ROUTE_APP, ROUTE_PROFILE, ROUTE_SITE, ROUTE_SIGN_IN } from '../routes'
import { useStore } from '../store'

const Master = (props) => {
  const { theme, blocks } = props

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
        <PrivateRoute
          path={`${ROUTE_APP}${ROUTE_SITE}/:siteID/*`}
          component={CmsRouter}
          theme={theme}
          blocks={blocks}
        />

        <SignIn path={`${ROUTE_APP}${ROUTE_SIGN_IN}`} />
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

export default Master
