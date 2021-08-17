import { useState, useEffect } from 'react';

// import components
import { getUser } from '../utils/auth';
import { authReducer, useAppDispatch } from '../redux';

const useAuth = () => {
  const dispatch: any = useAppDispatch();

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
      authReducer.refreshToken();
    };

    if (timer > 0) {
      refreshToken();
    }
  }, [timer]);

  useEffect(() => {
    dispatch(authReducer.getAuthUser());
  }, []);
};

export default useAuth;
