import axios from 'axios'
import {setToken} from '../auth'

const login = (uid) => ({
  type: 'LOGIN',
  uid
})

const startLogin = () => {
  
}

const logout = () => ({
  type: 'LOGOUT'
})

const startLogout = () => {
  
}

const signUp = ({ name, email }) => ({
  type: 'SIGNUP',
  email
})

const startSignUp = (newUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/users', newUser)    
      setToken(response.headers.authorization)
      dispatch(login({
        uid: response.data.uid,
        email: response.data.email
      }))
      return {success: true}
    } catch(e) {
      debugger;
      return {
        success: false,
        msg: e.response.data.msg || 'Error occurred, please try again later.'
      }
    }
  }
}

export { login, startLogin, logout, startLogout, signUp, startSignUp }
