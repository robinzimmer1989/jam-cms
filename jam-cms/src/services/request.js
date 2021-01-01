import { message } from 'antd';
import axios from 'axios';
import { navigate } from '@reach/router';

import { auth } from '../utils';
import { authActions } from '../actions';

const db = async (endpoint, params, dispatch, config) => {
  const user = auth.getUser(config);

  if (!user?.token) {
    authActions.signOut({ callback: () => navigate('/') }, dispatch, config);
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

    const { data } = result;
    return data;
  } catch (err) {
    if (err?.response?.data?.message) {
      message.error(err.response.data.message);
    }
  }
};

export default db;
