import { useState, useEffect } from 'react';

// import components
import { getUser } from '../utils/auth';
import { RootState, useAppSelector, useAppDispatch, authActions } from '../redux';

const useAuth = () => {
  const {
    auth: { userLoaded },
  } = useAppSelector((state: RootState) => state);

  const dispatch: any = useAppDispatch();

  const [timer, setTimer] = useState(0);

  const user = getUser();

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
    user?.authToken && userLoaded && dispatch(authActions.refreshToken());
  }, [timer]);

  useEffect(() => {
    user?.authToken && !userLoaded && dispatch(authActions.getAuthUser());
  }, []);
};

export default useAuth;
