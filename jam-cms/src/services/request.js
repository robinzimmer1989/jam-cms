import axios from 'axios';
import { navigate } from '@reach/router';

import { auth } from '../utils';
import getRoute from '../routes';
import { authActions } from '../actions';

const db = async (endpoint, params, dispatch, config) => {
  const user = auth.getUser(config);

  if (!user?.token) {
    authActions.signOut({ callback: () => navigate(getRoute(`sign-in`)), dispatch, config });
  }

  try {
    const formData = new FormData();
    Object.keys(params).map(
      (key) => typeof params[key] !== 'undefined' && formData.append(key, params[key])
    );

    const result = await axios.post(`${config?.source.replace(/\/+$/, '')}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'x-www-form-urlencoded',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const { data, status } = result;

    if (status === 200) {
      return data;
    } else {
      authActions.signOut({ callback: () => navigate(getRoute(`sign-in`)), dispatch, config });
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export default db;
