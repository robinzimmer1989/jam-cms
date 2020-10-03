import produce from 'immer'

export const editorState = {
  site: null,
  post: null,
  activeBlockIndex: null,
  view: 'desktop',
}

export const editorReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case `SET_EDITOR_SITE`:
        draft.site = payload
        break

      case `SET_EDITOR_POST`:
        draft.post = payload
        break

      case `SET_EDITOR_ACTIVE_BLOCK_INDEX`:
        draft.activeBlockIndex = payload
        break

      case `CLEAR_EDITOR`:
        draft.site = null
        draft.post = null
        draft.activeBlockIndex = null
        break

      default:
    }
  })
}
