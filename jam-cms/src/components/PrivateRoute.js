import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

// import app components
import { isLoggedIn, isPreview } from '../utils/auth';
import { useStore } from '../store';

const PrivateRoute = (props) => {
  const { component: Component, location, ...rest } = props;

  const [{ config }] = useStore();

  const loggedIn = isLoggedIn(config);
  const previewID = isPreview();

  useEffect(() => {
    const { location } = props;

    if (!loggedIn && !previewID && location.pathname !== `/`) {
      navigate('/');
    }
  }, [loggedIn, previewID]);

  return loggedIn || previewID ? <Component {...rest} /> : null;
};

export default PrivateRoute;
