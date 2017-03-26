// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export const asyncTypes = [
  'GET_SUGGESTED_ARTICLES',
  'GET_ARTICLE',
  'ADD_ARTICLE',
  'REMOVE_ARTICLE',
  'SEARCH_SUGGESTED_ARTICLES',
  'SIGNUP_USER',
  'CHECK_EMAIL',
  'SEND_ACTIVATION_EMAIL',
  'GET_ARTICLES',
  'REMOVE_SUGGESTED_ARTICLE',
  'ADD_SUGGESTED_ARTICLE',
  'GET_READ_PAPER',
  'SET_READ_PAPER',
  'GET_PROFILE',
  'SET_PROFILE',
]

const generateAsyncTypes = actionTypes => actionTypes.map(e => `${e}_PENDING\n${e}_SUCCESS\n${e}_FAILED\n`).join('')

export default createTypes(`
  SET_SIGNUP_DATA
  ADD_SUGGESTED_ARTICLE

  ${generateAsyncTypes(asyncTypes)}
`)
