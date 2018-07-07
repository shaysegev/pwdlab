import axios from 'axios'

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

const setToken = (token) => {
  localStorage.setItem('authorization', token)
}

const getToken = () => {
  return localStorage.getItem('authorization')
}

const deleteToken = () => {
  localStorage.removeItem('authorization')
}

export {
  setAuthInterceptor,
  setToken,
  getToken,
  deleteToken
}
