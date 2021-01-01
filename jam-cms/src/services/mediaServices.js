import { message } from 'antd';
import axios from 'axios';
import { navigate } from '@reach/router';

import { db } from '.';
import { auth } from '../utils';
import { authActions } from '../actions';

export const addMediaItem = async ({ siteID, file }, dispatch, config) => {
  const user = auth.getUser(config);

  if (!user?.token) {
    authActions.signOut({ callback: () => navigate('/') }, dispatch, config);
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    let result = await axios.post(`${config?.source}/createMediaItem?siteID=${siteID}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

export const updateMediaItem = async ({ siteID, id, altText }, dispatch, config) => {
  let result = await db('updateMediaItem', { siteID, id, altText }, dispatch, config);
  return result;
};

export const deleteMediaItem = async ({ siteID, id }, dispatch, config) => {
  let result = await db('deleteMediaItem', { siteID, id }, dispatch, config);
  return result;
};

export const getMediaItems = async ({ siteID, page = null, limit = 20 }, dispatch, config) => {
  let result = await db('getMediaItems', { siteID, page, limit }, dispatch, config);
  return result;
};
