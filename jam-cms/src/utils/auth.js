const isBrowser = typeof window !== `undefined`;

const defaultStorageKey = 'jam-cms-user';

export const setUser = (user, config) =>
  (window.localStorage[config?.storageKey || defaultStorageKey] = JSON.stringify(user));

export const getUser = (config) => {
  if (window.localStorage[config?.storageKey || defaultStorageKey]) {
    let user = JSON.parse(window.localStorage[config?.storageKey || defaultStorageKey]);
    return user ? user : {};
  }
  return {};
};

export const isLoggedIn = (config) => {
  if (!isBrowser) {
    return false;
  }

  const user = getUser(config);

  if (user) {
    return !!user.token;
  }

  return false;
};

export const getCurrentUser = (config) => isBrowser && getUser(config);

export const logout = (callback, config) => {
  if (!isBrowser) {
    return;
  }
  setUser({}, config);
  callback();
};
