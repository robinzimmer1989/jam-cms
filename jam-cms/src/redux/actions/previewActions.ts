import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/rest';

export interface GetSitePreviewArgs {
  previewID: string;
}

export const getSitePreview = createAsyncThunk(
  'preview/getSite',
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
  'preview/getPost',
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
  'preview/getLink',
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
