import axios from 'axios';

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

export const refreshToken = async ({ refreshToken }, url) => {
  const endpoint = getEndpoint(url);

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

  return result?.data;
};
