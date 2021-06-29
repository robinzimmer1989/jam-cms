import produce from 'immer';

export const editorState = {
  site: null,
  post: null,
  siteHasChanged: false,
  postHasChanged: false,
  changeIndex: 0,
  editorSettings: {
    fullscreen: false,
  },
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
        draft.changeIndex = 0;
        break;

      case `UPDATE_EDITOR_SITE`:
        draft.site = { ...draft.site, ...payload };
        draft.siteHasChanged = true;
        draft.changeIndex = draft.changeIndex + 1;
        break;

      /******************************
       * Posts
       ******************************/
      case `ADD_EDITOR_POST`:
        draft.post = payload;
        draft.postHasChanged = false;
        draft.changeIndex = 0;
        break;

      case `UPDATE_EDITOR_POST`:
        draft.post = { ...draft.post, ...payload };
        draft.postHasChanged = true;
        draft.changeIndex = draft.changeIndex + 1;
        break;

      /******************************
       * General Settings
       ******************************/
      case `UPDATE_EDITOR_SETTINGS`:
        draft.editorSettings = { ...draft.editorSettings, ...payload };
        break;

      /******************************
       * Clear
       ******************************/
      case `CLEAR_EDITOR`:
        draft.site = null;
        draft.siteHasChanged = false;

        draft.post = null;
        draft.postHasChanged = false;

        draft.changeIndex = 0;

        break;

      default:
    }
  });
};
