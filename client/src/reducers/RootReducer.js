import { combineReducers } from 'redux'
import SimpleReducer from './SimpleReducer'
import AuthReducer from './AuthReducer'

export default combineReducers({
  simple: SimpleReducer,
  auth: AuthReducer
})