import { navigate } from '@reach/router';

import { userServices } from '../services';
import { authActions } from '../actions';
import getRoute from '../routes';

export const addUser = async ({ siteID, email, role }, dispatch, config) => {
  const result = await userServices.addUser({ siteID, email, role }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_USER`, payload: { siteID, ...result } });
  }

  return result;
};

export const getAuthUser = async ({}, dispatch, config) => {
  const result = await userServices.getAuthUser({}, dispatch, config);

  if (result) {
    if (result.hasOwnProperty('success') && !result.success) {
      authActions.signOut({ callback: () => navigate(getRoute(`sign-in`)) }, dispatch, config);
    } else {
      dispatch({ type: `ADD_AUTH_USER`, payload: result });
    }
  }

  return result;
};

export const getUser = async ({ siteID, id }, dispatch, config) => {
  const result = await userServices.getUser({ id }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_USER`, payload: { siteID, ...result } });
  }

  return result;
};

export const getUsers = async ({ siteID, page, limit }, dispatch, config) => {
  const result = await userServices.getUsers({ siteID, page, limit }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_USERS`, payload: { siteID, ...result } });
  }

  return result;
};

export const updateUser = async ({ siteID, id, role }, dispatch, config) => {
  const result = await userServices.updateUser({ siteID, id, role }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_USER`, payload: { siteID, ...result } });
  }
};

export const deleteUser = async ({ siteID, id }, dispatch, config) => {
  const result = await userServices.deleteUser({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_USER`, payload: { siteID, ...result } });
  }
};
