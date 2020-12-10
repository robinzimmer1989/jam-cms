import React, { createContext, useContext, useReducer } from 'react';

import { configReducer } from './configState';
import { authState, authReducer } from './authState';
import { globalState, globalReducer } from './globalState';
import { editorState, editorReducer } from './editorState';
import { cmsState, sitesReducer } from './cmsState';

export const StateContext = createContext({});

export const StoreProvider = ({ children, config }) => {
  const initialState = {
    config,
    authState,
    globalState,
    editorState,
    cmsState,
  };

  const reducer = ({ authState, globalState, editorState, cmsState }, action) => ({
    config: configReducer(config, action),
    authState: authReducer(authState, action),
    globalState: globalReducer(globalState, action),
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
