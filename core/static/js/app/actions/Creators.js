import Types, { asyncTypes } from './Types'
import addAsyncActions from './AddAsyncActions'
import { setToLocalStore } from '../services/utils'

const actions = {
  setSignupData: payload => {
    setToLocalStore('signup', payload)
    return { type: Types.SET_SIGNUP_DATA, payload }
  },
}

export default addAsyncActions(actions, asyncTypes)
