import { authServices } from '../services';
import { auth } from '../utils';

export const signIn = async ({ email, password }, url) => {
  const result = await authServices.signIn({ email, password }, url);

  if (
    result?.data?.login?.authToken &&
    result?.data?.login?.user?.capabilities.includes('edit_posts')
  ) {
    auth.setUser(result.data.login);
  }

  return result;
};

export const signOut = async ({ callback }, dispatch) => {
  auth.logout(callback);
  dispatch({ type: `REMOVE_AUTH_USER` });
};

export const forgetPassword = async ({ email }, url) => {
  const result = await authServices.forgetPassword({ email }, url);
  return result;
};

export const resetPassword = async ({ key, login, password }, url) => {
  const result = await authServices.resetPassword({ key, login, password }, url);
  return result;
};

export const refreshToken = async ({}, dispatch, config) => {
  const { refreshToken } = auth.getUser();

  if (refreshToken) {
    const result = await authServices.refreshToken({ refreshToken }, dispatch, config);

    if (result?.data?.refreshJwtAuthToken) {
      auth.setUser({ refreshToken, ...result.data.refreshJwtAuthToken });
    }

    return result;
  }
};
