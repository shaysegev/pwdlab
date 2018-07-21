import axios from 'axios'
import { addPublicKey } from '../lib/crypt'
import { setToken } from '../auth'
import { userRoutes } from '../apiConfig'

const login = ({ _id, email }) => ({
  type: 'LOGIN',
  _id,
  email
})

const startLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(userRoutes.login, credentials)
      if (res.data.success) {
        setToken(res.headers.authorization)
        addPublicKey(res.data.key)
        dispatch(login(res.data))
        return {success: true}
      }
    } catch(e) {
      return {
        success: false,
        msg: e.response.data.msg || 'Error occurred, please try again later.'
      }
    }
  }
}

const logout = () => ({
  type: 'LOGOUT'
})

const startLogout = () => {
  // todo
}

const startSignUp = (newUser) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(userRoutes.default, newUser)
      if (res.data.success) {
        setToken(res.headers.authorization)
        addPublicKey(res.data.key)
        dispatch(login(res.data))
        return {success: true}
      }
    } catch(e) {
      return {
        success: false,
        msg: e.response.data.msg || 'Error occurred, please try again later.'
      }
    }
  }
}

export { login, startLogin, logout, startLogout, startSignUp }
