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

/**
 * @const {jsx} App Application store and routes
 */
const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

/**
 * Render applcation
 */
const renderApp = () => {
  ReactDOM.render(App, document.getElementById('root'))
}

ReactDOM.render(<LoadingPage />, document.getElementById('root'))

/**
 * Init app
 * handles user auth changes, redirects, and app rendering
 */
const initApp = async () => {
  const res = await verifyToken()

  if (res.success) {
    store.dispatch(login(res))
    initAuthIdleTimeout()
    if (history.location.pathname === '/') {
      history.push('/dashboard')
    }
    renderApp()
    await store.dispatch(startSetRecords())
    registerAuthChange()  
  } else {
    await store.dispatch(logout())
    registerAuthChange()
    history.push('/')
    renderApp()
  }
}

/**
 * Subscribing to auth changes in store
 */
function registerAuthChange() {
  store.subscribe(handleAuthChange)
  currentAuthState = store.getState().auth.uid
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
  if (previousAuthState !== currentAuthState) {
    reinitApp()
  }
}

/**
 * Re-init app (calls on auth change)
 */
function reinitApp() {
  initApp()
}

initApp()
registerServiceWorker()