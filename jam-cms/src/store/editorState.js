import produce from 'immer';

export const editorState = {
  site: null,
  post: null,
  siteHasChanged: false,
  postHasChanged: false,
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
        draft.siteHasChanged = false;
        break;

      case `UPDATE_EDITOR_SITE`:
        draft.site = payload;
        draft.siteHasChanged = true;
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
        draft.postHasChanged = false;
        break;

      case `UPDATE_EDITOR_POST`:
        draft.post = payload;
        draft.postHasChanged = true;
        break;

      /******************************
       * General Settings
       ******************************/
      case `SET_EDITOR_VIEWPORT`:
        draft.viewport = payload;
        break;

      case `SET_EDITOR_SIDEBAR`:
        draft.sidebar = payload;
        break;

      case `CLEAR_EDITOR`:
        draft.site = null;
        draft.siteHasChanged = false;

        draft.post = null;
        draft.postHasChanged = false;

        break;

      default:
    }
  });
};
