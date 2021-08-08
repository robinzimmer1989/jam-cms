import produce from 'immer';

import { getUser } from '../utils/auth';

// Get 'capabilities' information from local storage to avoid unnecessary waiting to fetch authUser.
// Technically, someone could manipulate those values manually, but the API call for site or post afterwards would fail anyway.
const storageUser = getUser();

const defaultState = {
  id: null,
  email: '',
  roles: '',
  capabilities: storageUser.capabilities,
};

export const authState = { ...defaultState };

export const authReducer = (state: any, action: any) => {
  const { payload } = action;

  return produce(state, (draft: any) => {
    switch (action.type) {
      case `ADD_AUTH_USER`:
        draft.authUser = payload;
        break;

      case `REMOVE_AUTH_USER`:
        draft.authUser = { ...defaultState };
        break;

      default:
    }
  });
};
