import React, { createContext, useContext, useReducer } from 'react';

// import app components
import { formatFields } from '../utils';

import { configReducer } from './configState';
import { authState, authReducer } from './authState';
import { appState, appReducer } from './appState';
import { editorState, editorReducer } from './editorState';
import { cmsState, sitesReducer } from './cmsState';

export const StateContext = createContext({} as any);

export const StoreProvider = ({ children, source, settings, siteID = 'default', fields }: any) => {
  const config = { source, settings, siteID, fields: formatFields(fields) };

  const initialState = {
    config,
    authState,
    appState,
    editorState,
    cmsState,
  };

  const reducer = ({ authState, appState, editorState, cmsState }: any, action: any) =>
    ({
      config: configReducer(config, action),
      authState: authReducer(authState, action),
      appState: appReducer(appState, action),
      editorState: editorReducer(editorState, action),
      cmsState: sitesReducer(cmsState, action),
    } as any);

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStore = () => useContext(StateContext);
