import produce from 'immer';

export const editorState = {
  site: null,
  post: null,
  form: null,
  hasChanged: false,
  viewport: 'desktop',
  sidebar: false,
};

export const editorReducer = (state, action) => {
  const { payload } = action;

  return produce(state, (draft) => {
    switch (action.type) {
      /******************************
       * Sites
       ******************************/
      case `ADD_EDITOR_SITE`:
        draft.site = payload;
        break;

      case `UPDATE_EDITOR_SITE`:
        draft.site = payload;
        draft.hasChanged = true;
        break;

      /******************************
       * Collections
       ******************************/
      case `UPDATE_EDITOR_COLLECTION`:
        draft.site.postTypes[payload.id] = payload;
        break;

      /******************************
       * Posts
       ******************************/
      case `ADD_EDITOR_POST`:
        draft.post = payload;
        break;

      case `UPDATE_EDITOR_POST`:
        draft.post = payload;
        draft.hasChanged = true;
        break;

      /******************************
       * Forms
       ******************************/
      case `ADD_EDITOR_FORM`:
        draft.form = payload;
        break;

      case `UPDATE_EDITOR_FORM`:
        draft.form = payload;
        draft.hasChanged = true;
        break;

      /******************************
       * General Settings
       ******************************/
      case `SET_HAS_CHANGED`:
        draft.hasChanged = payload;
        break;

      case `SET_EDITOR_VIEWPORT`:
        draft.viewport = payload;
        break;

      case `SET_EDITOR_SIDEBAR`:
        draft.sidebar = payload;
        break;

      case `CLEAR_EDITOR`:
        draft.site = null;
        draft.post = null;
        draft.form = null;
        draft.hasChanged = false;
        draft.viewport = 'desktop';
        draft.sidebar = false;
        break;

      default:
    }
  });
};
