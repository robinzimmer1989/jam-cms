import React from 'react'
import { navigate } from '@reach/router'

// import app components
import { isLoggedIn } from 'utils/auth'
import getRoute from 'routes'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, location, ...rest } = this.props
    if (!isLoggedIn()) {
      navigate(getRoute(`sign-in`))
      return null
    }
    return <Component {...rest} />
  }
}

export default PrivateRoute
