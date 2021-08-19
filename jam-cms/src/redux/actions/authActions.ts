import { createAsyncThunk } from '@reduxjs/toolkit';

import graphql from '../api/graphql';
import { getUser, setUser, logout } from '../../utils/auth';

export interface SignInArgs {
  email: string;
  password: string;
}

export const signIn = async (args: SignInArgs, source: string) => {
  const query = `
    mutation  {
      login(
        input: {
          username: "${args.email}"
          password: "${args.password}"
          clientMutationId: "login"
        }
      ) {
        authToken
        refreshToken
        user {
          jwtAuthExpiration
          capabilities
        }
      }
    }
  `;

  const response = await graphql(query, source);

  if (response?.data?.login) {
    const {
      data: {
        login: {
          authToken,
          refreshToken,
          user: { jwtAuthExpiration, capabilities },
        },
      },
    } = response;

    const formattedCapabilities: any = {};

    capabilities.map((s: string) => {
      formattedCapabilities[s] = true;
    });

    return { authToken, refreshToken, jwtAuthExpiration, capabilities: formattedCapabilities };
  }
};

export interface ForgetPasswordArgs {
  email: string;
}

export const forgetPassword = async (args: ForgetPasswordArgs, source: string) => {
  const query = `
    mutation {
      sendPasswordResetEmail(
        input: {
          username: "${args.email}"
          clientMutationId: "forgotPassword"
        }
      ) {
        user {
          email
        }
      }
    }
  `;

  const response = await graphql(query, source);

  return response?.data;
};

export interface ResetPasswordArgs {
  key: string;
  login: string;
  password: string;
}

export const resetPassword = async (args: ResetPasswordArgs, source: string) => {
  const query = `
    mutation {
      resetUserPassword(
        input: {
          key: "${args.key}"
          login: "${args.login}"
          password: "${args.password}"
          clientMutationId: "changePassword"
        }
      ) {
        user {
          email
        }
      }
    }
  `;

  const response = await graphql(query, source);

  return response?.data;
};

export const getAuthUser = createAsyncThunk('auth/getUser', async (args, thunkAPI) => {
  const {
    cms: {
      config: { source },
    },
  }: any = thunkAPI.getState();

  const query = `
    query {
      viewer {
        id
        email
        capabilities
        jwtAuthExpiration
        roles {
          nodes {
            name
          }
        }
      }
    }
  `;

  const response = await graphql(query, source);

  if (!response?.data?.viewer) {
    logout({});
    return null;
  }

  const {
    data: {
      viewer: { id, email, capabilities, roles, jwtAuthExpiration },
    },
  } = response;

  const storageUser = getUser();

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

  const storageUser = getUser();

  const query = `
    mutation {
      refreshJwtAuthToken(
        input: {
          jwtRefreshToken: "${storageUser.refreshToken}"
          clientMutationId: "refreshToken"
        }
      ) {
        authToken
      }
    }
  `;

  const response = await graphql(query, source);

  if (response?.data?.refreshJwtAuthToken) {
    const {
      data: {
        refreshJwtAuthToken: { authToken },
      },
    } = response;

    // Overwrite auth token
    setUser({ ...storageUser, authToken });
  } else {
    logout({});
  }
});
