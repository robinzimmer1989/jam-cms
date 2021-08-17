import { RootState, useAppDispatch, useAppSelector } from './store';

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

import * as authReducer from './reducer/authReducer';
import * as siteReducer from './reducer/siteReducer';
import * as postReducer from './reducer/postReducer';
import * as termReducer from './reducer/termReducer';
import * as mediaReducer from './reducer/mediaReducer';
import * as previewReducer from './reducer/previewReducer';
import * as userReducer from './reducer/userReducer';
import * as languageReducer from './reducer/languageReducer';

export {
  RootState,
  useAppDispatch,
  useAppSelector,
  authReducer,
  siteReducer,
  postReducer,
  termReducer,
  mediaReducer,
  previewReducer,
  userReducer,
  languageReducer,
  setConfig,
  setDeploymentImage,
  setActiveLanguage,
  addEditorSite,
  updateEditorSite,
  addEditorPost,
  updateEditorPost,
  clearEditor,
  showDialog,
  hideDialog,
  updateEditorSettings,
};
