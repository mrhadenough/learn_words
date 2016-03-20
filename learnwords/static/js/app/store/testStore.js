import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import testReducer from '../reducers/testReducer.js'

export default function configureStore(initialState) {
  const store = createStore(testReducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
}
