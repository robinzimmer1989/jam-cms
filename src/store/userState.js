import produce from 'immer'

export const userState = {}

export const userReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      default:
    }
  })
}
