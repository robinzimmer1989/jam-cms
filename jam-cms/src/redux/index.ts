import { store, RootState, useAppDispatch, useAppSelector } from './store';

import {
  setConfig,
  setDeploymentImage,
  setActiveLanguage,
  addEditorSite,
  updateEditorSite,
  addEditorPost,
  updateEditorPost,
  clearEditor,
} from './slices/cmsSlice';

import { showDialog, hideDialog, updateEditorSettings } from './slices/uiSlice';

import * as authActions from './actions/authActions';
import * as siteActions from './actions/siteActions';
import * as postActions from './actions/postActions';
import * as termActions from './actions/termActions';
import * as mediaActions from './actions/mediaActions';
import * as previewActions from './actions/previewActions';
import * as userActions from './actions/userActions';
import * as languageActions from './actions/languageActions';

const cmsActions = {
  setConfig,
  setDeploymentImage,
  setActiveLanguage,
  addEditorSite,
  updateEditorSite,
  addEditorPost,
  updateEditorPost,
  clearEditor,
};

const uiActions = { showDialog, hideDialog, updateEditorSettings };

export {
  store,
  RootState,
  useAppDispatch,
  useAppSelector,
  authActions,
  siteActions,
  postActions,
  termActions,
  mediaActions,
  previewActions,
  userActions,
  languageActions,
  cmsActions,
  uiActions,
};
