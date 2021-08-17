import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/db';
import { Deployment, EditorOptions } from '../../types';
import { formatSite } from '../../utils';

export const getSite = createAsyncThunk('cms/getSite', async (args, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response: any = await db('getSite', {}, source);

  const formattedSite: any = formatSite(response);

  return formattedSite;
});

export interface UpdateSiteArgs {
  themeOptions?: any;
  frontPage?: number | null | undefined;
  deployment?: Deployment;
  title?: string;
  siteUrl?: string;
  googleMapsApi?: string;
  apiKey?: string;
  editorOptions?: EditorOptions;
}

export const updateSite = createAsyncThunk(
  'cms/updateSite',
  async (args: UpdateSiteArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('updateSite', args, source);

    const formattedSite: any = formatSite(response);

    return formattedSite;
  }
);

export const deploySite = createAsyncThunk('cms/deploySite', async (args, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('deploySite', {}, source);

  const formattedSite: any = formatSite(response);

  return formattedSite;
});

export interface SyncSiteArgs {
  apiKey: string;
  fields: any;
}

export const syncFields = createAsyncThunk(
  'cms/syncFields',
  async (args: SyncSiteArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('syncFields', args, source);

    const formattedSite: any = formatSite(response);

    return formattedSite;
  }
);

export const getUnpublishedChanges = createAsyncThunk(
  'cms/getUnpublishedChanges',
  async (args, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('getUnpublishedChanges', {}, source);

    return response;
  }
);
