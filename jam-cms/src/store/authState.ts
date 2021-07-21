import produce from 'immer';

const defaultState = {
  id: null,
  email: '',
  roles: '',
  capabilities: {},
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
