import { getUser, getPreviewID } from './auth';

export default function validateAccess(checkIfTokenIsExpired = false) {
  const authUser = getUser();

  if (checkIfTokenIsExpired && authUser?.authToken && authUser?.jwtAuthExpiration) {
    const now = Date.now().valueOf() / 1000;

    if (authUser.jwtAuthExpiration > now) {
      return true;
    }
  } else if (authUser?.authToken) {
    return true;
  } else if (getPreviewID()) {
    return true;
  }

  return false;
}
