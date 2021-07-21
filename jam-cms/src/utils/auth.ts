import { navigate } from '@reach/router';

import getStorageKey from './getStorageKey';
import getParameter from './getParameter';

const storageKey = getStorageKey();
const isBrowser = typeof window !== `undefined`;

export const deleteUser = () => {
  if (storageKey) {
    localStorage.removeItem(storageKey);
  }
};

export const setUser = (user: any) => {
  if (storageKey) {
    localStorage.setItem(storageKey, JSON.stringify(user));
  }
};

export const getUser = () => {
  const user = localStorage.getItem(storageKey);
  return user ? JSON.parse(user) : {};
};

export const isLoggedIn = () => {
  if (!isBrowser) {
    return false;
  }

  const user: any = getUser();

  if (user) {
    return !!user.authToken;
  }

  return false;
};

export const getPreviewID = () => {
  if (!isBrowser) {
    return false;
  }

  const preview = getParameter('preview');

  if (!preview) {
    return false;
  }

  return preview;
};

export const logout = (onLogout: any) => {
  if (!isBrowser) {
    return;
  }

  deleteUser();

  // Reload page
  typeof onLogout === 'function'
    ? onLogout()
    : typeof window !== 'undefined' && navigate(window.location.pathname);
};
