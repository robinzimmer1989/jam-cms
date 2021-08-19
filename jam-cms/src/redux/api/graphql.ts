import { message } from 'antd';
import axios from 'axios';
import Parser from 'html-react-parser';

// import app components
import { getUser } from '../../utils/auth';

const graphql = async (query: string, source: string) => {
  try {
    // Create a new CancelToken source for this request
    const cancelTokenSource = axios.CancelToken.source();

    // TODO: Move to utils function
    const cleanedUrl = source.replace(/\/+$/, '');

    const headers: any = {};

    const user = getUser();

    if (user?.authToken) {
      headers.Authorization = `Bearer ${user.authToken}`;
    }

    const result = await axios.post(`${cleanedUrl}/graphql`, { query }, { headers });

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

export default graphql;
