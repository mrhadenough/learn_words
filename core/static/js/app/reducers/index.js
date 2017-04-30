import _ from 'underscore'
import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'

import types from '../actions/Types'
import { camelize } from '../actions/AddAsyncActions'

const getReducerType = type =>
  camelize(_.without(type.split('_'), 'SUCCESS', 'FAILED', 'PENDING', 'GET', 'SET').join('_'))

const INIT_STATE = {
  success: false,
  failed: false,
  pending: false,
  data: {},
}

const defaultReducer = (type) => (state = new Immutable(INIT_STATE), action) => {
  if (getReducerType(type) !== getReducerType(action.type)) {
    return state
  }
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

const cleanTypes = _.chain(types)
  .keys()
  .map(e => getReducerType(e))
  .uniq()
  .value()

const reducers = {}
cleanTypes.forEach(e => {
  reducers[e] = defaultReducer(e)
})

export default combineReducers({
  rootReducer,
  ...reducers,
})
