import produce from 'immer'

export const editorState = {
  site: null,
  post: null,
  form: null,
  editorIndex: null,
  hasChanged: false,
  viewport: 'desktop',
}

export const editorReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case `ADD_EDITOR_SITE`:
        draft.site = payload
        break

      case `UPDATE_EDITOR_SITE`:
        draft.site = payload
        draft.hasChanged = true
        break

      case `ADD_EDITOR_POST`:
        draft.post = payload
        break

      case `UPDATE_EDITOR_POST`:
        draft.post = payload
        draft.hasChanged = true
        break

      case `ADD_EDITOR_FORM`:
        draft.post = payload
        break

      case `UPDATE_EDITOR_FORM`:
        draft.form = payload
        draft.hasChanged = true
        break

      case `SET_EDITOR_INDEX`:
        draft.editorIndex = payload
        break

      case `SET_HAS_CHANGED`:
        draft.hasChanged = payload
        break

      case `SET_EDITOR_VIEWPORT`:
        draft.viewport = payload
        break

      case `CLEAR_EDITOR`:
        draft.site = null
        draft.post = null
        draft.editorIndex = null
        break

      default:
    }
  })
}
