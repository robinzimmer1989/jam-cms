import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Dialog } from '../../types';

export interface EditorSettings {
  fullscreen: boolean;
}

export interface UIState {
  dialog: Dialog;
  editorSettings: EditorSettings;
}

const initialState: UIState = {
  dialog: {
    open: false,
    width: 500,
    title: '',
    component: null,
  },
  editorSettings: {
    fullscreen: false,
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showDialog: (state: any, action: PayloadAction<Dialog>) => {
      state.dialog = action.payload;
    },
    hideDialog: (state: any) => {
      state.dialog = { ...initialState.dialog };
    },
    updateEditorSettings: (state: any, action: PayloadAction<EditorSettings>) => {
      state.editorSettings = { ...state.editorSettings, ...action.payload };
    },
  },
});

export const { showDialog, hideDialog, updateEditorSettings } = uiSlice.actions;

export default uiSlice.reducer;
