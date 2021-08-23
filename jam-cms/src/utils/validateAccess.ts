import { getUser, deleteUser, getPreviewID } from './auth';

export default function validateAccess(checkIfTokenIsExpired = false) {
  if (typeof window !== 'undefined') {
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

    deleteUser();
  }

  return false;
}
