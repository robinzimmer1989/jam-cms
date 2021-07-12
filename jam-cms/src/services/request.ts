import { message } from 'antd';
import axios from 'axios';
import Parser from 'html-react-parser';

// import app components
import { getUser, getPreviewID } from '../utils/auth';
import { authActions } from '../actions';

const db = async (endpoint: any, params: any, dispatch: any, config: any) => {
  const user = getUser();

  if (!user?.authToken && !getPreviewID()) {
    authActions.signOut({}, dispatch, config);
  }

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
      if (endpoint === 'getAuthUser' || endpoint === 'getSite') {
        authActions.signOut({}, dispatch, config);
      } else {
        message.error(Parser(err.response.data.message));
      }
    }
  }
};

export default db;
