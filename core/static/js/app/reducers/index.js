import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'

// import ArticleReducer from './ArticleReducer'

const rootReducer = (state = new Immutable({}), action) => {
  // add base logic for success pending faild
  switch (action.type) {
  default:
    return state
  }
}

export default combineReducers({
  rootReducer,
  // article: ArticleReducer,
})
