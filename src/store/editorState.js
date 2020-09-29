import produce from 'immer'

export const editorState = {
  post: null,
  activeBlockIndex: null,
}

export const editorReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case 'SET_EDITOR_POST':
        draft.post = payload
        break

      case 'SET_EDITOR_ACTIVE_BLOCK_INDEX':
        draft.activeBlockIndex = payload
        break

      default:
    }
  })
}
