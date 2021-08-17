import axios from 'axios';

import { auth } from '../utils';

// TODO: add trailing slash function to utils and pass in endpoint via settings (doesn't need to be /graphql)
const getEndpoint = (url: any) => `${url.replace(/\/+$/, '')}/graphql`;

export const signIn = async ({ email, password }: any, url: any) => {
  try {
    const endpoint = getEndpoint(url);
    const result = await axios.post(endpoint, {
      query: `
        mutation  {
          login(
            input: {
              username: "${email}"
              password: "${password}"
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
      `,
    });

    // Format response accordingly
    if (result?.data?.data?.login?.authToken) {
      const {
        data: {
          data: {
            login: {
              authToken,
              refreshToken,
              user: { jwtAuthExpiration, capabilities },
            },
          },
        },
      } = result;

      const formattedCapabilities: any = {};

      capabilities.map((s: string) => {
        formattedCapabilities[s] = true;
      });

      return { authToken, refreshToken, jwtAuthExpiration, capabilities: formattedCapabilities };
    }

    return result?.data;
  } catch (err) {
    console.log(err);
  }
};

export const forgetPassword = async ({ email }: any, url: any) => {
  const endpoint = getEndpoint(url);
  const result = await axios.post(endpoint, {
    query: `
      mutation {
        sendPasswordResetEmail(
          input: {
            username: "${email}"
            clientMutationId: "forgotPassword"
          }
        ) {
          user {
            email
          }
        }
      }
    `,
  });
  return result?.data;
};

export const resetPassword = async ({ key, login, password }: any, url: any) => {
  const endpoint = getEndpoint(url);
  const result = await axios.post(endpoint, {
    query: `
      mutation {
        resetUserPassword(
          input: {
            key: "${key}"
            login: "${login}"
            password: "${password}"
            clientMutationId: "changePassword"
          }
        ) {
          user {
            email
          }
        }
      }
    `,
  });
  return result?.data;
};

export const refreshToken = async ({ refreshToken }: any, url: string) => {
  const endpoint = getEndpoint(url);
  const result: any = await axios.post(endpoint, {
    query: `
      mutation {
        refreshJwtAuthToken(
          input: {
            jwtRefreshToken: "${refreshToken}"
            clientMutationId: "refreshToken"
          }
        ) {
          authToken
        }
      }
    `,
  });

  if (result?.data?.data?.refreshJwtAuthToken) {
    const {
      data: {
        data: {
          refreshJwtAuthToken: { authToken },
        },
      },
    } = result;

    return authToken;
  }

  return false;
};

export const getAuthUser = async (url: string) => {
  const user = auth.getUser();

  const result: any = await axios.post(
    url,
    {
      query: `
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
      `,
    },
    {
      headers: {
        Authorization: `Bearer ${user.authToken}`,
      },
    }
  );

  return result;
};
