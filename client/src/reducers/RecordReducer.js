import { decrypt } from '../lib/crypt'

const recordsReducerDefaultState = []

const recordKeysToDecrypt = ['title', 'url', 'password', 'login', 'notes']

export default (state = recordsReducerDefaultState, action) => {  
  switch (action.type) {
    case 'ADD_RECORD':
      return {}
    case 'EDIT_RECORD':
      return {}
    case 'REMOVE_RECORD':
      return {}
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
