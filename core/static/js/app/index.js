/* globals document */
import 'babel-core/register'
import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import rootReducer from './reducers'

import configureStore from './store'
import routes from './routes'

const store = configureStore({}, rootReducer)

import AppRoute from './routes'

render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById('root')
)
