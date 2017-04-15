import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'

const defaultReducer = (state, action) => {
  const newState = { ...state }
  if (action.type.endsWith('PENDING')) {
    return {
      ...state,
      success: false,
      failed: false,
      pending: true,
      data: {},
    }
  } else if (action.type.endsWith('SUCCESS')) {
    return {
      ...state,
      success: true,
      failed: false,
      pending: false,
      data: action.payload && action.payload.data,
    }
  } else if (action.type.endsWith('FAILED')) {
    return {
      ...state,
      success: false,
      failed: true,
      pending: false,
      error: action.payload.problem,
    }
  }
  return newState
}


const rootReducer = (state = new Immutable({}), action) => {
  // add base logic for success pending faild
  switch (action.type) {
  default:
    return state
  }
}

export default combineReducers({
  rootReducer,
  words: defaultReducer,
})
