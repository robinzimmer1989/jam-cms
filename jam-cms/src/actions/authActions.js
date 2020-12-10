import { authServices } from '../services';
import { auth } from '../utils';

export const signIn = async ({ username, password }, dispatch, config) => {
  const result = await authServices.signIn({ username, password }, dispatch, config);

  if (result?.data?.token) {
    auth.setUser(result.data, config);
  }

  return result;
};

export const signOut = async ({ callback }, dispatch, config) => {
  auth.logout(callback, config);

  dispatch({ type: `REMOVE_AUTH_USER` });
};

export const resetPassword = async ({ email }, dispatch, config) => {
  const result = await authServices.signIn({ email }, dispatch, config);

  return result;
};
