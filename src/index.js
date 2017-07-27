import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store'
import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

// Let the reducers handle initial state
const initialState = {}
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root')
)
