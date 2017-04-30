import _ from 'underscore'
import api from '../services/api'


export const camelize = text =>
  text.toLowerCase().replace(/(_[A-Za-z])/g, $1 =>
    $1.toUpperCase().replace('_', '')
  )

const actionCreator = (type) => {
  const camelType = camelize(type)
  return (payload, callback, errorCallback) => (dispatch, getState) => {
    if (!api[camelType]) {
      console.error(`Api method: "${camelType}"" is mission.`)
    }
    dispatch({ type: `${type}_PENDING`, payload })
    api[camelType](payload).then(response => {
      if (response.ok) {
        dispatch({ type: `${type}_SUCCESS`, payload: response })
        if (callback) {
          callback(response)
        }
      } else {
        dispatch({ type: `${type}_FAILED`, payload: response })
        if (errorCallback) {
          errorCallback(response)
        }
      }
    }, response => {
      dispatch({ type: `${type}_FAILED`, payload: response })
      if (errorCallback) {
        errorCallback(response)
      }
    })
  }
}

const actionFinalize = (type, payload) => ({ type, payload })


export default (actions, asyncTypes) => {
  const newActions = { ...actions }
  _.forEach(asyncTypes, type => {
    newActions[(camelize(type))] = actionCreator(type)
    newActions[(camelize(`${type}_SUCCESS`))] = actionFinalize(`${type}_SUCCESS`)
    newActions[(camelize(`${type}_FAILED`))] = actionFinalize(`${type}_FAILED`)
  })
  return newActions
}
