import React, { useEffect } from 'react';

// import app components
import { isLoggedIn, isPreview } from '../utils/auth';
import { useStore } from '../store';
import { authActions } from '../actions';

const PrivateRoute = (props) => {
  const { component: Component, location, ...rest } = props;

  const [{ config }, dispatch] = useStore();

  const loggedIn = isLoggedIn(config);
  const previewID = isPreview();

  useEffect(() => {
    const { location } = props;

    if (!loggedIn && !previewID && location.pathname !== `/`) {
      authActions.signOut({}, dispatch, config);
    }
  }, [loggedIn, previewID]);

  return loggedIn || previewID ? <Component {...rest} /> : null;
};

export default PrivateRoute;
