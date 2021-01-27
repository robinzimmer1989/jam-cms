import getStorageKey from './getStorageKey';
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

export const getCurrentUser = () => isBrowser && getUser();

export const logout = (callback) => {
  if (!isBrowser) {
    return;
  }
  setUser({});

  callback();
};
