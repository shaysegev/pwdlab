import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppRouter, { history } from './routes/AppRouter'
import LoadingPage from 'Components/LoadingPage'
import registerServiceWorker from './registerServiceWorker'
import { setAuthInterceptor, initAuthIdleTimeout, verifyToken } from './auth'
import { login, logout } from 'Actions/auth'
import { startSetRecords } from 'Actions/record'

setAuthInterceptor()

const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

const renderApp = () => {
  ReactDOM.render(App, document.getElementById('root'))
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'))

/**
 * App initalised flag to avoid re-rendering app
 */
let appInitialised = false

const initApp = async () => {
  const res = await verifyToken()
  store.subscribe(handleAuthChange)

  if (res.success) {
    store.dispatch(login(res))
    initAuthIdleTimeout()
    if (history.location.pathname === '/') {
      history.push('/dashboard')
    }
    renderApp()
    store.dispatch(startSetRecords())
  } else {
    store.dispatch(logout())
    history.push('/')
    renderApp()
  }

  appInitialised = true
}

/**
 * Current app auth state
 */
let currentAuthState

/**
 * Re-initialise app if auth state changes
 */
function handleAuthChange() {
  let previousAuthState = currentAuthState
  currentAuthState = store.getState().auth.uid
  if (previousAuthState !== currentAuthState && appInitialised) {
    reinitApp()
  }
}

function reinitApp() {
  initApp()
}

initApp()
registerServiceWorker()