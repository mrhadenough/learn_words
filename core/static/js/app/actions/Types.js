// A list of all actions in the system.
import { createTypes } from 'reduxsauce'

export const asyncTypes = [
  'LOGIN',
  'GET_WORDS',
  'GUESS_WORD',
]

const generateAsyncTypes = actionTypes => actionTypes.map(e => `${e}_PENDING\n${e}_SUCCESS\n${e}_FAILED\n`).join('')

export default createTypes(`

  ${generateAsyncTypes(asyncTypes)}
`)
