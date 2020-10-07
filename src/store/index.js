import React, { createContext, useContext, useReducer } from 'react'

import { appState, appReducer } from './appState'
import { editorState, editorReducer } from './editorState'
import { postState, postReducer } from './postState'

export const StateContext = createContext({})

export const StoreProvider = props => {
  const initialState = {
    appState,
    editorState,
    postState,
  }

  const reducer = ({ appState, editorState, postState }, action) => ({
    appState: appReducer(appState, action),
    editorState: editorReducer(editorState, action),
    postState: postReducer(postState, action),
  })

  return <StateContext.Provider value={useReducer(reducer, initialState)}>{props.children}</StateContext.Provider>
}

export const useStore = () => useContext(StateContext)
