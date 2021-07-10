import { message } from 'antd';
import axios from 'axios';

// import app components
import { db } from '.';
import { auth } from '../utils';
import { authActions } from '../actions';

export const addMediaItem = async ({
  siteID,
  file
}: any, dispatch: any, config: any) => {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  const user = auth.getUser(config);

  if (!user?.authToken) {
    authActions.signOut({}, dispatch, config);
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const cleanedUrl = config?.source.replace(/\/+$/, '');

    let result = await axios.post(
      `${cleanedUrl}/wp-json/jamcms/v1/createMediaItem?siteID=${siteID}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.authToken}`,
        },
      }
    );

    const { data } = result;

    return data;
  } catch (err) {
    if (err?.response?.data?.message) {
      message.error(err.response.data.message);
    }
  }
};

export const updateMediaItem = async ({
  siteID,
  id,
  altText
}: any, dispatch: any, config: any) => {
  let result = await db('updateMediaItem', { siteID, id, altText }, dispatch, config);
  return result;
};

export const deleteMediaItem = async ({
  siteID,
  id
}: any, dispatch: any, config: any) => {
  let result = await db('deleteMediaItem', { siteID, id }, dispatch, config);
  return result;
};

export const getMediaItems = async ({
  siteID,
  page,
  limit,
  search,
  allow
}: any, dispatch: any, config: any) => {
  let result = await db('getMediaItems', { siteID, page, limit, search, allow }, dispatch, config);
  return result;
};
