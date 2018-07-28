import axios from 'axios'
import { addPublicKey } from './lib/crypt'
import { userRoutes } from './apiConfig'
import { startLogout } from './actions/auth'
import store from './store'

/**
 * Auth count to idle
 */
let authTimeoutCounter;

/**
 * Auth HTTP interceptor
 * Adding auth token to all requests
 * 
 * @returns object config
 */
const setAuthInterceptor = () => {
  axios.interceptors.request.use(
    config => {
      const token = getToken()
      if (token) {
        config.headers.authorization = token
      }

      return config
    },
    error => Promise.reject(error)
  )

  axios.interceptors.response.use(undefined, err => {
    let res = err.response;
    if (res.status === 401) {
      deleteToken()
    }
  })
}

/**
 * Init timeout to logout
 * 
 * @returns void
 */
const initAuthIdleTimeout = () => {
  window.onload = setAuthTimer
  window.onmousemove = setAuthTimer
  window.onmousedown = setAuthTimer
  window.ontouchstart = setAuthTimer
  window.onclick = setAuthTimer
  window.onkeypress = setAuthTimer
  window.addEventListener('scroll', setAuthTimer, true)
}

/**
 * Clear and set auth timer on user activity
 * 
 * @returns void
 */
const setAuthTimer = () => {
  clearTimeout(authTimeoutCounter)
  if (!store.getState().auth.uid) {
    return
  }
  authTimeoutCounter = setTimeout(() => {
    // todo verify user activity
    store.dispatch(startLogout())
  }, 60000 * 30) // 30 minutes
}

/**
 * Verify user token and return user if verified
 * 
 * @returns object (user)
 */
const verifyToken = async () => {
  const token = getToken()
  if (!token) {
    return {success: false}
  }

  try {
    const response = await axios.post(userRoutes.me)
    addPublicKey(response.data.key)
    return response.data
  } catch (e) {
    return {success: false}
  }
}

/**
 * Set auth token in local storage
 * 
 * @param token
 * @returns void
 */
const setToken = (token) => {
  localStorage.setItem('authorization', token)
}

/**
 * Get auth token from local storage
 * 
 * @returns string token
 */
const getToken = () => {
  return localStorage.getItem('authorization')
}

/**
 * Deletes token from local storage
 * 
 * @returns void
 */
const deleteToken = () => {
  localStorage.removeItem('authorization')
}

export {
  setAuthInterceptor,
  initAuthIdleTimeout,
  verifyToken,
  setToken,
  getToken,
  deleteToken
}
