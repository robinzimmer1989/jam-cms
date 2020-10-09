import React, { createContext, useContext, useReducer } from 'react'

import { globalState, globalReducer } from './globalState'
import { editorState, editorReducer } from './editorState'
import { sitesState, sitesReducer } from './sitesState'

export const StateContext = createContext({})

export const StoreProvider = props => {
  const initialState = {
    globalState,
    editorState,
    sitesState,
  }

  const reducer = ({ globalState, editorState, sitesState }, action) => ({
    globalState: globalReducer(globalState, action),
    editorState: editorReducer(editorState, action),
    sitesState: sitesReducer(sitesState, action),
  })

  return <StateContext.Provider value={useReducer(reducer, initialState)}>{props.children}</StateContext.Provider>
}

export const useStore = () => useContext(StateContext)
