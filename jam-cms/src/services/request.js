import { message } from 'antd';
import axios from 'axios';
import { navigate } from '@reach/router';

import { auth } from '../utils';
import { authActions } from '../actions';

const db = async (endpoint, params, dispatch, config) => {
  const user = auth.getUser(config);

  if (!user?.authToken) {
    authActions.signOut({ callback: () => navigate('/') }, dispatch, config);
  }

  try {
    const formData = new FormData();
    Object.keys(params).map(
      (key) => typeof params[key] !== 'undefined' && formData.append(key, params[key])
    );

    const cleanedUrl = config?.source.replace(/\/+$/, '');

    const result = await axios.post(`${cleanedUrl}/wp-json/jamcms/v1/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'x-www-form-urlencoded',
        Authorization: `Bearer ${user.authToken}`,
      },
    });

    return result?.data;
  } catch (err) {
    if (err?.response?.data?.message) {
      if (endpoint === 'getAuthUser' || endpoint === 'getSite') {
        authActions.signOut({ callback: () => navigate('/') }, dispatch, config);
      } else {
        message.error(err.response.data.message);
      }
    }
  }
};

export default db;
