import React, { useEffect } from 'react'
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
import { userActions } from '../actions'

const Master = (props) => {
  const { theme, blocks } = props

  const [
    {
      globalState: { dialog },
    },
    dispatch,
  ] = useStore()

  useEffect(() => {
    const getUser = async () => {
      await userActions.getAuthUser({}, dispatch)
    }

    getUser()
  }, [])

  const cmsPath = `${ROUTE_APP}${ROUTE_SITE}/:siteID/*`

  return (
    <>
      <Router>
        <PrivateRoute path={`${ROUTE_APP}`} component={Home} />
        <PrivateRoute path={`${ROUTE_APP}${ROUTE_PROFILE}`} component={Profile} />
        <PrivateRoute path={cmsPath} component={CmsRouter} theme={theme} blocks={blocks} />

        <SignIn path={`${ROUTE_APP}${ROUTE_SIGN_IN}`} />
      </Router>

      {dialog.open && (
        <Modal
          transitionName="none"
          maskTransitionName="none"
          title={dialog.title}
          visible={true}
          onCancel={() => dispatch({ type: 'CLOSE_DIALOG' })}
          children={dialog.component}
          width={dialog.width}
          footer={null}
        />
      )}
    </>
  )
}

export default Master
