import { decrypt } from '../lib/crypt'

const recordsReducerDefaultState = []

const recordKeysToDecrypt = ['title', 'url', 'password', 'login', 'notes']

export default (state = recordsReducerDefaultState, action) => {  
  switch (action.type) {
    case 'ADD_RECORD':
      return [
        ...state,
        action.record
      ]
    case 'EDIT_RECORD':
      return state.map((record) => {
        if (record._id === action.record._id) {
          // Update the edited record
          return action.record
        }

        return record
      })
    case 'DELETE_RECORD':
      return state.filter((record) => {
        if (record._id !== action.recordId) {
          // Add all items besides the deleted one
          return record
        }
      })
    case 'SET_RECORDS':
      return action.records.map((record) => {
        recordKeysToDecrypt.forEach((key) => {
          if (record[key] && record[key] !== '') {
            record[key] = decrypt(record[key]).toString()
          }
        })
        return record
      })
    default:
      return state
  }
}
