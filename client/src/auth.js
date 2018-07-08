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

const verifyToken = async () => {
  const token = getToken()
  if (!token) {
    return {success: false}
  }

  try {
    const response = await axios.post('/api/users/me')
    return response.data
  } catch (e) {
    return {success: false}
  }
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
  verifyToken,
  setToken,
  getToken,
  deleteToken
}
