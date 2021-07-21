import { useState, useEffect } from 'react';

// import components
import { useStore } from '../store';
import { authActions } from '../actions';
import { getUser } from '../utils/auth';

const useAuth = () => {
  const [{ config }, dispatch] = useStore();

  const [timer, setTimer] = useState(0);

  const user = getUser();

  useEffect(() => {
    let intervalID: any = null;

    if (user?.authToken) {
      intervalID = setInterval(() => {
        setTimer((time) => time + 1);
      }, 90000); // 90 seconds
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
      await authActions.getAuthUser({}, dispatch, config);
    };

    if (user?.authToken) {
      loadUser();
    }
  }, []);
};

export default useAuth;
