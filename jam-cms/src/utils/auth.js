const isBrowser = typeof window !== `undefined`;
const storageKey = process.env.GATSBY_CMS_LOCAL_STORAGE_KEY || 'jam-cms-user';

export const setUser = (user) => (window.localStorage[storageKey] = JSON.stringify(user));

export const getUser = () => {
  if (window.localStorage[storageKey]) {
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
    return !!user.token;
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
