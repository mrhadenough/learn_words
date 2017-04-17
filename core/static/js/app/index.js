/* globals document */
import 'babel-core/register'
import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import rootReducer from './reducers'

import configureStore from './store'
import AppRoute from './routes'

const store = configureStore({}, rootReducer)


render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById('root')
)
