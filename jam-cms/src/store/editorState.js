import produce from 'immer';

export const editorState = {
  site: null,
  post: null,
  siteHasChanged: false,
  postHasChanged: false,
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
        draft.site = { ...draft.site, ...payload };
        draft.siteHasChanged = true;
        break;

      /******************************
       * Posts
       ******************************/
      case `ADD_EDITOR_POST`:
        draft.post = payload;
        draft.postHasChanged = false;
        break;

      case `UPDATE_EDITOR_POST`:
        draft.post = { ...draft.post, ...payload };
        draft.postHasChanged = true;
        break;

      /******************************
       * General Settings
       ******************************/
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
