import produce from 'immer'

export const globalState = {
  menu: false,
  dialog: {
    open: false,
    width: 500,
    title: '',
    component: null,
  },
}

export const globalReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case 'SET_MENU':
        draft.menu = payload
        break

      case 'SET_DIALOG':
        draft.dialog = {
          width: 500,
          ...payload,
        }
        break

      case 'CLOSE_DIALOG':
        draft.dialog = {
          ...draft.dialog,
          open: false,
          title: '',
          width: 500,
          component: null,
        }
        break

      default:
    }
  })
}
