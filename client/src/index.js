import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import AppRouter, { history } from './routes/AppRouter'
import LoadingPage from 'Components/LoadingPage'
import registerServiceWorker from './registerServiceWorker'
import { setAuthInterceptor, verifyToken, deleteToken } from './auth'
import { login, logout } from 'Actions/auth'

setAuthInterceptor()
const store = configureStore()

const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(App, document.getElementById('root'))
    hasRendered = true
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'))

const initAuth = async () => {
  const res = await verifyToken()
  res.success = false // todo remove - temp
  
  if (res.success) {
    store.dispatch(login(res.user))
    renderApp()
    if (history.location.pathname === '/') {
      history.push('/dashboard')
    }
  } else {
    store.dispatch(logout())
    deleteToken()
    renderApp()
    history.push('/')
  }
}

initAuth()
registerServiceWorker()