import axios from 'axios'
import { userRoutes } from './apiConfig'

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
}

/**
 * Init timeout to logout
 * 
 * @returns void
 */
const initAuthIdleTimeout = () => {
  window.onload = resetAuthTimer;
  window.onmousemove = resetAuthTimer;
  window.onmousedown = resetAuthTimer;
  window.ontouchstart = resetAuthTimer;
  window.onclick = resetAuthTimer; 
  window.onkeypress = resetAuthTimer;   
  window.addEventListener('scroll', resetAuthTimer, true);
}

/**
 * Reset timer on user action
 */
const resetAuthTimer = () => {
  clearTimeout(authTimeoutCounter);
  authTimeoutCounter = setTimeout(logout, 60000 * 30); // 30 minutes
}

/**
 * Logout user
 */
const logout = () => {
  // todo logout / popup?
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
