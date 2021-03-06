import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

// import app components
import { isLoggedIn } from '../utils/auth';
import { useStore } from '../store';

const PrivateRoute = (props) => {
  const { component: Component, location, ...rest } = props;

  const [{ config }] = useStore();

  useEffect(() => {
    const { location } = props;

    if (!isLoggedIn(config) && location.pathname !== `/`) {
      navigate('/');
    }
  });

  return isLoggedIn(config) ? <Component {...rest} /> : null;
};

export default PrivateRoute;
