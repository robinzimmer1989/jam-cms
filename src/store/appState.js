import produce from 'immer'

export const appState = {
  menu: false,
  dialog: {
    open: false,
    title: '',
    component: null,
  },
}

export const appReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case 'SET_MENU':
        draft.menu = payload
        break

      case 'SET_DIALOG':
        draft.dialog = payload
        break

      case 'CLOSE_DIALOG':
        draft.dialog = {
          ...draft.dialog,
          open: false,
        }
        break

      default:
    }
  })
}
