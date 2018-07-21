import axios from 'axios'
import { encrypt } from '../lib/crypt'
import { recordRoutes } from '../apiConfig'

const addRecord = (record) => ({
  type: 'ADD_RECORD',
  record
})

const startAddRecord = (record = {}) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(recordRoutes.default, {_: encrypt(JSON.stringify(record))})
      if (res.data.success) {
        dispatch(addRecord(record))
        return {success: true}
      }
    } catch(e) {
      return {
        success: false,
        msg: `Could not store record, please try again.`
      }
    }
  }
}

const editRecord = (record) => ({
  type: 'EDIT_RECORD',
  record
})

const startEditRecord = () => {
  // todo
}

const deleteRecord = (recordId) => ({
  type: 'DELETE_RECORD',
  recordId
})

const startDeleteRecord = () => {
  // todo
}

const getRecords = (records) => ({
  type: 'GET_RECORDS',
  records
})

const startGetRecords = () => {
  // todo
}

export {
  startAddRecord,
  startEditRecord,
  startDeleteRecord,
  startGetRecords
}