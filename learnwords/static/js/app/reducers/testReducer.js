import {combineReducers} from 'redux'

import {INIT_STATE, REQUEST_WORD, LOADING_WORD, VOTE_WORD, WAIT_FOR_VOTE, INVALID_VOTE} from '../actions/testAction'

const initialState = {
    status: 'init'
}

function test(state=initialState, action) {
    switch(action.type) {
        case INIT_STATE:
            return {...initialState}
        case REQUEST_WORD:
            // ajax
            return {...state}
        case LOADING_WORD:
            // should be set after request word
            return {...state, status: 'pending'}
        case VOTE_WORD:
            return {...state, vote: action.vote}
        case WAIT_FOR_VOTE:
            // not sure if this necessary
            return {...state}
        case INVALID_VOTE:
            return {...state, status: 'invalid'}
        default:
            return {...state}
    }
}

const testReducer = combineReducers({
  test
})

export default testReducer
