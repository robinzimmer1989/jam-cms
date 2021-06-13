import axios from 'axios';
import { navigate } from '@reach/router';

// import app components
import { authActions } from '../actions';

// TODO: add trailing slash function to utils and pass in endpoint via settings (doesn't need to be /graphql)
const getEndpoint = (url) => `${url.replace(/\/+$/, '')}/graphql`;

export const signIn = async ({ email, password }, url) => {
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
            user{
              capabilities
            }
          }
        }
      `,
    });

    return result?.data;
  } catch (err) {
    console.log(err);
  }
};

export const forgetPassword = async ({ email }, url) => {
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

export const resetPassword = async ({ key, login, password }, url) => {
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

export const refreshToken = async ({ refreshToken }, dispatch, config) => {
  const endpoint = getEndpoint(config.source);

  const result = await axios.post(endpoint, {
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

  if (result?.errors?.length > 0) {
    authActions.signOut({ callback: () => navigate('/') }, dispatch, config);
  }

  return result?.data;
};
