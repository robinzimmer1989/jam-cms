import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/db';

export interface TranslateTermArgs {
  id: number;
  language: string;
}

export const translateTerm = createAsyncThunk(
  'cms/translateTerm',
  async (args: TranslateTermArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('translateTerm', args, source);

    return response;
  }
);

export interface AddTermArgs {
  taxonomyID: number;
  title: string;
  slug: string;
  parentID: number;
  description: string;
  language?: string;
}

export const addTerm = createAsyncThunk('cms/addTerm', async (args: AddTermArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('createTerm', args, source);

  return response;
});

export interface UpdateTermArgs {
  id: number;
  taxonomyID: number;
  title: string;
  slug: string;
  parentID: number;
  description: string;
  language?: string;
}

export const updateTerm = createAsyncThunk(
  'cms/updateTerm',
  async (args: UpdateTermArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('createTerm', args, source);

    return response;
  }
);

export interface DeleteTermArgs {
  id: number;
  taxonomyID: number;
}

export const deleteTerm = createAsyncThunk(
  'cms/deleteTerm',
  async (args: DeleteTermArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('deleteTerm', args, source);

    // The response will be true on success, so we wanna pass down the args instead
    if (response) {
      return args;
    }

    return response;
  }
);
