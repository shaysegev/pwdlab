import axios from 'axios'
import { addPublicKey } from './lib/crypt'
import { userRoutes } from './apiConfig'
import { logout, startLogout } from './actions/auth'
import store from './store'

/**
 * Auth count to idle
 */
let authTimeoutCounter;

/**
 * Auth HTTP interceptor
 * Adding auth token to all requests
 * 
 * @return {object} config
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

  axios.interceptors.response.use((response) => {
    return response;
  }, function (err) {
    let res = err.response;
    if (res.status === 401) {
      deleteToken()
      store.dispatch(logout())
      // todo with message    
    }
    return Promise.reject(err);
  });
}

/**
 * Init timeout to logout
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
 * @return {object} user/false if not verified
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
 * @param {string} token JWT token
 */
const setToken = (token) => {
  localStorage.setItem('authorization', token)
}

/**
 * Get auth token from local storage
 * 
 * @return {string} token
 */
const getToken = () => {
  return localStorage.getItem('authorization')
}

/**
 * Deletes token from local storage
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
