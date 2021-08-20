import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/rest';

export const getLanguages = createAsyncThunk('language/list', async (args, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('getLanguages', {}, source);

  return response;
});

export interface AddLanguageArgs {
  name: string;
  slug: string;
  locale: string;
}

export const addLanguage = createAsyncThunk(
  'language/add',
  async (args: AddLanguageArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('addLanguage', args, source);

    return response;
  }
);

export interface UpdateLanguageArgs {
  id: number;
  name: string;
  slug: string;
  locale: string;
}

export const updateLanguage = createAsyncThunk(
  'language/update',
  async (args: UpdateLanguageArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('updateLanguage', args, source);

    return response;
  }
);

export interface DeleteLanguageArgs {
  id: number;
}

export const deleteLanguage = createAsyncThunk(
  'language/delete',
  async (args: DeleteLanguageArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('deleteLanguage', args, source);

    return response;
  }
);

export interface UpdateSettingsArgs {
  defaultLanguage: string;
  postTypes: string[];
  taxonomies: string[];
}

export const updateLanguageSettings = createAsyncThunk(
  'language/updateSettings',
  async (args: UpdateSettingsArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('updateLanguageSettings', args, source);

    if (response) {
      return args;
    }
  }
);

export interface TranslateMassArgs {
  ids: number[];
  type: string;
  language: string;
}

export const translateMass = createAsyncThunk(
  'language/translateMass',
  async (args: TranslateMassArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('setLanguageInMass', args, source);

    if (response) {
      return args;
    }
  }
);
