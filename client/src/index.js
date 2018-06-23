import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import AppRouter from './routes/AppRouter'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={configureStore()}>
    <AppRouter />
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
