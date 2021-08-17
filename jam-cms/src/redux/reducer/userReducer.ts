import { createAsyncThunk } from '@reduxjs/toolkit';

import db from '../api/db';

export interface AddUserArgs {
  email: string;
  role: string;
  sendEmail: boolean;
}

export const addUser = createAsyncThunk('cms/addUser', async (args: AddUserArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('createUser', args, source);

  return response;
});

export interface GetUserArgs {
  id: number;
}

export const getUser = createAsyncThunk('cms/getUser', async (args: GetUserArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('getUser', args, source);

  return response;
});

export interface GetUsersArgs {
  page: number;
  limit: number;
}

export const getUsers = createAsyncThunk('cms/getUsers', async (args: GetUsersArgs, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await db('getUsers', args, source);

  return response;
});

export interface UpdateUsersArgs {
  id: number;
  role: string;
}

export const updateUser = createAsyncThunk(
  'cms/updateUser',
  async (args: UpdateUsersArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('updateUser', args, source);

    return response;
  }
);

export interface DeleteUserArgs {
  id: number;
}

export const deleteUser = createAsyncThunk(
  'cms/deleteUser',
  async (args: DeleteUserArgs, thunkAPI) => {
    const {
      cms: {
        config: { source },
      },
    }: any = thunkAPI.getState();

    const response = await db('deleteUser', args, source);

    return response;
  }
);
