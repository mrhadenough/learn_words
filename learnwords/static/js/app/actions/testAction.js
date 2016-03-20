export const INIT_STATE = 'INIT_STATE'
export const REQUEST_WORD = 'REQUEST_WORD'
export const LOADING_WORD = 'LOADING_WORD'
export const VOTE_WORD = 'VOTE_WORD'
export const WAIT_FOR_VOTE = 'WAIT_FOR_VOTE'
export const INVALID_VOTE = 'INVALID_VOTE'


export function voteWord(data) {
    return {
        type: VOTE_WORD,
        data
    }
}


export function requestWord(data) {
    return {
        type: REQUEST_WORD,
        data
    }
}
