import produce from 'immer';

export const authState = {
  authUser: null,
};

export const authReducer = (state: any, action: any) => {
  const { payload } = action;

  return produce(state, (draft: any) => {
    switch (action.type) {
      case `ADD_AUTH_USER`:
        draft.authUser = payload;
        break;

      case `REMOVE_AUTH_USER`:
        draft.authUser = null;
        break;

      default:
    }
  });
};
