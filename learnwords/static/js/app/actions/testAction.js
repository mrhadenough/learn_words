/* globals $ */
export const INIT_STATE = 'INIT_STATE'
export const REQUEST_WORD = 'REQUEST_WORD'
export const SUCCESS_LOAD_WORD = 'SUCCESS_LOAD_WORD'
export const FAILED_LOAD_WORD = 'FAILED_LOAD_WORD'
export const VOTE_WORD = 'VOTE_WORD'
export const INVALID_VOTE = 'INVALID_VOTE'


const initState = () => ({type: INIT_STATE})
const voteWord = (data) => ({type: VOTE_WORD, data})
const requestWord = (data) => {
    return (dispatch) => {
        return $.ajax({url: '/word/'}).then(response => {
            dispatch(loadWord(response))
        }, error => {
            console.log(error)
            dispatch(failedLoadWord(error))
        })
    }
}
const loadWord = (data) => ({type: SUCCESS_LOAD_WORD, data})
const failedLoadWord = (data) => ({type: FAILED_LOAD_WORD, data})

export {initState, voteWord, requestWord, loadWord, failedLoadWord}
