import { message } from 'antd';
import axios from 'axios';
import Parser from 'html-react-parser';
import { isObject } from 'lodash';

// import app components
import { getUser, logout } from '../../utils/auth';
import { validateAccess } from '../../utils';

const db = async (
  endpoint: string,
  args: any,
  source: string,
  contentType: string = 'x-www-form-urlencoded'
) => {
  if (!validateAccess()) {
    logout({});
    return;
  }

  const user = getUser();

  try {
    const formData = new FormData();

    Object.keys(args).map((key) => {
      if (typeof args[key] !== 'undefined') {
        // Transform objects to string
        const value =
          isObject(args[key]) && contentType === 'x-www-form-urlencoded'
            ? JSON.stringify(args[key])
            : args[key];

        formData.append(key, value);
      }
    });

    // Create a new CancelToken source for this request
    const cancelTokenSource = axios.CancelToken.source();

    // TODO: Move to utils function
    const cleanedUrl = source.replace(/\/+$/, '');

    // TODO: Make variable to allow for different CMS source
    const result = await axios.post(`${cleanedUrl}/wp-json/jamcms/v1/${endpoint}`, formData, {
      cancelToken: cancelTokenSource.token,
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${user.authToken}`,
      },
    });

    // Cancel request
    cancelTokenSource.cancel();

    if (result?.data) {
      return result.data;
    }
  } catch (err) {
    if (err?.response?.data?.message) {
      message.error(Parser(err.response.data.message));
    }
  }

  return null;
};

export default db;
