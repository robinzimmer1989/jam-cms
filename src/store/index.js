import React, { createContext, useContext, useReducer } from 'react'

import { globalState, globalReducer } from './globalState'
import { editorState, editorReducer } from './editorState'
import { cmsState, sitesReducer } from './cmsState'

export const StateContext = createContext({})

export const StoreProvider = props => {
  const initialState = {
    globalState,
    editorState,
    cmsState,
  }

  const reducer = ({ globalState, editorState, cmsState }, action) => ({
    globalState: globalReducer(globalState, action),
    editorState: editorReducer(editorState, action),
    cmsState: sitesReducer(cmsState, action),
  })

  return <StateContext.Provider value={useReducer(reducer, initialState)}>{props.children}</StateContext.Provider>
}

export const useStore = () => useContext(StateContext)
