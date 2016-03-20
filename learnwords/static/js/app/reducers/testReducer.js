import {combineReducers} from 'redux'

import {INIT_STATE, REQUEST_WORD, SUCCESS_LOAD_WORD, FAILED_LOAD_WORD, VOTE_WORD, INVALID_VOTE} from '../actions/testAction'

const initialState = {
    status: 'init',
    word: {},
    options: []
}

const test = (state=initialState, action) => {
    switch(action.type) {
        case INIT_STATE:
            return {...initialState}
        case REQUEST_WORD:
            // ajax
            return {...state, status: 'pending'}
        case SUCCESS_LOAD_WORD:
            return {...state, word: action.data.word, options: action.data.options, status: 'success'}
        case FAILED_LOAD_WORD:
            // should be set after request word
            return {...state, status: 'fail'}
        // case VOTE_WORD:
            // return {...state, vote: action.vote}
        // case WAIT_FOR_VOTE:
            // not sure if this necessary
            // return {...state}
        case INVALID_VOTE:
            return {...state, status: 'invalid'}
        default:
            return state
    }
}

const testReducer = combineReducers({
  test
})

export default testReducer
