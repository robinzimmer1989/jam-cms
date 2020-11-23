import produce from 'immer'

export const authState = {
  authUser: null,
}

export const authReducer = (state, action) => {
  const { payload } = action

  return produce(state, (draft) => {
    switch (action.type) {
      case `ADD_AUTH_USER`:
        draft.authUser = payload
        break

      case `REMOVE_AUTH_USER`:
        draft.authUser = null
        break

      default:
    }
  })
}
