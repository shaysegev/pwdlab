import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import RecordReducer from './RecordReducer'

export default combineReducers({
  auth: AuthReducer,
  record: RecordReducer
})