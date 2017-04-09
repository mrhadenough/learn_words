/* globals document */
import 'babel-core/register'
import 'babel-polyfill'
// React imports
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
// import { Router, useRouterHistory } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
// import { createHashHistory } from 'history'
import rootReducer from './reducers'

import configureStore from './store'
import routes from './routes'

// const history = useRouterHistory(createHashHistory)({ queryKey: false })
const store = configureStore({}, rootReducer)

import AppRoute from './routes'

    // <Router history={history} routes={routes} />
render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById('root')
)
