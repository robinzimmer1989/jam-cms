import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/db';

export interface GetSitePreviewArgs {
  previewID: string;
}

export const getSitePreview = createAsyncThunk(
  'cms/getSitePreview',
  async (args: GetSitePreviewArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('getSitePreview', args, source);

    return response;
  }
);

export interface GetPostPreviewArgs {
  previewID: string;
}

export const getPostPreview = createAsyncThunk(
  'cms/getPostPreview',
  async (args: GetPostPreviewArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('getPostPreview', args, source);

    return response;
  }
);

export interface GetPreviewLinkArgs {
  postID: number;
  expiryDate: number;
}

export const getPreviewLink = createAsyncThunk(
  'cms/getPreviewLink',
  async (args: GetPreviewLinkArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('getPreviewLink', args, source);

    return response;
  }
);
