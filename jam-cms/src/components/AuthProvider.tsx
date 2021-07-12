import React, { useState, useEffect } from 'react';

// import components
import Loader from './Loader';

import { useStore } from '../store';
import { authActions, userActions } from '../actions';
import { getUser, getPreviewID } from '../utils/auth';

const AuthProvider = (props: any) => {
  const [
    {
      config,
      authState: { authUser },
    },
    dispatch,
  ] = useStore();

  const [timer, setTimer] = useState(0);

  const user = getUser();
  const previewID = getPreviewID();

  useEffect(() => {
    let intervalID: any = null;

    if (user?.authToken) {
      intervalID = setInterval(() => {
        setTimer((time) => time + 1);
      }, 60000); // 60 seconds
    }

    // Clear timer
    return () => {
      intervalID && clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      await authActions.refreshToken({}, dispatch, config);
    };

    if (timer > 0) {
      refreshToken();
    }
  }, [timer]);

  useEffect(() => {
    const loadUser = async () => {
      await userActions.getAuthUser({}, dispatch, config);
    };

    if (user?.authToken) {
      loadUser();
    }
  }, []);

  return authUser || previewID ? props.children : <Loader />;
};

export default AuthProvider;
