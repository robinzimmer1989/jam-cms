import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/rest';

export interface AddMediaItemArgs {
  file: any;
}

export const addMediaItem = createAsyncThunk(
  'media/add',
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
  'media/update',
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
  'media/delete',
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
  'media/getAll',
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
