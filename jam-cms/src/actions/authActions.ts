import { authServices } from '../services';
import { auth } from '../utils';

export const signIn = async ({ email, password }, url) => {
  const result = await authServices.signIn({ email, password }, url);
  return result;
};

export const signOut = async ({ onLogout }, dispatch, config) => {
  auth.logout(onLogout);
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
