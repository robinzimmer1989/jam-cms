import { message } from 'antd';
import axios from 'axios';
import Parser from 'html-react-parser';

// import app components
import { getUser } from '../utils/auth';
import { validateAccess } from '../utils';
import { authActions } from '../actions';

const db = async (endpoint: any, params: any, dispatch: any, config: any) => {
  if (!validateAccess()) {
    return authActions.signOut({}, dispatch, config);
  }

  const user = getUser();

  try {
    const formData = new FormData();
    Object.keys(params).map(
      (key) => typeof params[key] !== 'undefined' && formData.append(key, params[key])
    );

    // TODO: Move to utils function
    const cleanedUrl = config?.source.replace(/\/+$/, '');

    // TODO: Make variable to allow for different CMS source
    const result = await axios.post(`${cleanedUrl}/wp-json/jamcms/v1/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'x-www-form-urlencoded',
        Authorization: `Bearer ${user.authToken}`,
      },
    });

    return result?.data;
  } catch (err) {
    if (err?.response?.data?.message) {
      if (endpoint === 'getSite') {
        authActions.signOut({}, dispatch, config);
      } else {
        message.error(Parser(err.response.data.message));
      }
    }
  }
};

export default db;
