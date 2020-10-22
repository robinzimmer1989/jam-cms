import React, { useEffect } from 'react'
import { navigate } from '@reach/router'

// import app components
import { isLoggedIn } from 'utils/auth'

const PrivateRoute = props => {
  const { component: Component, location, ...rest } = props

  useEffect(() => {
    const { location } = props

    if (!isLoggedIn() && location.pathname !== `/`) {
      navigate(`/`)
    }
  })

  return isLoggedIn() ? <Component {...rest} /> : null
}

export default PrivateRoute
