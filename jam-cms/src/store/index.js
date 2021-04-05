import React, { createContext, useContext, useReducer } from 'react';

import { configReducer } from './configState';
import { globalReducer } from './globalState';
import { authState, authReducer } from './authState';
import { appState, appReducer } from './appState';
import { editorState, editorReducer } from './editorState';
import { cmsState, sitesReducer } from './cmsState';

export const StateContext = createContext({});

export const StoreProvider = ({ children, source, globalOptions, settings }) => {
  const config = { source, settings };

  const initialState = {
    config,
    globalOptions,
    authState,
    appState,
    editorState,
    cmsState,
  };

  const reducer = ({ authState, appState, editorState, cmsState }, action) => ({
    config: configReducer(config, action),
    globalOptions: globalReducer(globalOptions, action),
    authState: authReducer(authState, action),
    appState: appReducer(appState, action),
    editorState: editorReducer(editorState, action),
    cmsState: sitesReducer(cmsState, action),
  });

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStore = () => useContext(StateContext);
