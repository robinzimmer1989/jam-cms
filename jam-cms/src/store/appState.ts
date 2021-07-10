import produce from 'immer';

export const appState = {
  menu: false,
  dialog: {
    open: false,
    width: 500,
    title: '',
    component: null,
  },
};

export const appReducer = (state: any, action: any) => {
  const { payload } = action;

  return produce(state, (draft: any) => {
    switch (action.type) {
      case `SET_MENU`:
        draft.menu = payload;
        break;

      case `SET_DIALOG`:
        draft.dialog = {
          width: 500,
          ...payload,
        };
        break;

      case `CLOSE_DIALOG`:
        draft.dialog = {
          ...draft.dialog,
          open: false,
          title: '',
          width: 500,
          component: null,
        };
        break;

      default:
    }
  });
};
