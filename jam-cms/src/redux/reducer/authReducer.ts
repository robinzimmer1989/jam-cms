import { createAsyncThunk } from '@reduxjs/toolkit';

import { authServices } from '../../services';
import { getUser, setUser, logout } from '../../utils/auth';

const storageUser = getUser();

export const getAuthUser = createAsyncThunk('auth/getUser', async (args, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await authServices.getAuthUser(source);

  if (!response.data) {
    return null;
  }

  const {
    data: {
      data: {
        viewer: { id, email, capabilities, roles, jwtAuthExpiration },
      },
    },
  } = response;

  setUser({ ...storageUser, jwtAuthExpiration });

  const formattedCapabilities: any = {};

  capabilities.map((s: string) => {
    formattedCapabilities[s] = true;
  });

  return {
    id,
    email,
    capabilities: formattedCapabilities,
    roles: roles?.nodes.map((o: any) => o.name) || [],
    jwtAuthExpiration,
  };
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (args, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const response = await authServices.refreshToken(
    { refreshToken: storageUser.refreshToken },
    source
  );

  if (response) {
    // Overwrite auth token
    setUser({ ...storageUser, authToken: response });
  } else {
    logout({});
  }
});
