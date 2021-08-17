import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/db';

export interface AddMediaItemArgs {
  file: any;
}

export const addMediaItem = createAsyncThunk(
  'cms/addMediaItem',
  async (args: AddMediaItemArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('createMediaItem', args, source, 'multipart/form-data');

    return response;
  }
);

export interface UpdateMediaItemArgs {
  id: number;
  altText: string;
}

export const updateMediaItem = createAsyncThunk(
  'cms/updateMediaItem',
  async (args: UpdateMediaItemArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('updateMediaItem', args, source);

    return response;
  }
);

export interface DeleteMediaItemArgs {
  id: number;
}

export const deleteMediaItem = createAsyncThunk(
  'cms/deleteMediaItem',
  async (args: DeleteMediaItemArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('deleteMediaItem', args, source);

    return response;
  }
);

export interface GetMediaItemsArgs {
  page: number;
  limit: number;
  search?: string;
  allow?: string;
}

export const getMediaItems = createAsyncThunk(
  'cms/getMediaItems',
  async (args: GetMediaItemsArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('getMediaItems', args, source);

    return response;
  }
);
