import { navigate } from 'gatsby';

import getStorageKey from './getStorageKey';
import getParameter from './getParameter';

const storageKey = getStorageKey();
const isBrowser = typeof window !== `undefined`;

export const setUser = (user) => {
  if (storageKey) {
    window.localStorage[storageKey] = JSON.stringify(user);
  }
};

export const getUser = () => {
  if (storageKey && window.localStorage[storageKey]) {
    let user = JSON.parse(window.localStorage[storageKey]);
    return user ? user : {};
  }
  return {};
};

export const isLoggedIn = () => {
  if (!isBrowser) {
    return false;
  }

  const user = getUser();

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

export const getCurrentUser = () => isBrowser && getUser();

export const logout = (onLogout) => {
  if (!isBrowser) {
    return;
  }

  setUser({});
  // Reload page
  typeof onLogout === 'function'
    ? onLogout()
    : typeof window !== 'undefined' && navigate(window.location.pathname);
};