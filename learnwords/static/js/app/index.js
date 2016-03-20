import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import {createStore} from 'redux'

import App from './components/App'
import configureStore from './store/testStore'

const store = configureStore()
// const store = createStore(App)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
