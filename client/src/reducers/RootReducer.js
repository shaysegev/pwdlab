import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import RecordReducer from './RecordReducer'
import RecordFormReducer from './RecordFormReducer'

export default combineReducers({
  auth: AuthReducer,
  record: RecordReducer,
  recordForm: RecordFormReducer,
})