import axios from 'axios'
import { encrypt } from '../lib/crypt'
import { recordRoutes } from '../apiConfig'

const saveRecord = (record) => ({
  type: 'SAVE_RECORD',
  record
})

const startSaveRecord = (record = {}) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(recordRoutes.default, {_: encrypt(JSON.stringify(record))})
      if (res.data.success) {
        dispatch(saveRecord(record))
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

const deleteRecord = (recordId) => ({
  type: 'DELETE_RECORD',
  recordId
})

const startDeleteRecord = () => {
  // todo
}

const setRecords = (records) => ({
  type: 'SET_RECORDS',
  records
})

const startSetRecords = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(recordRoutes.default)
      if (res.data.success) {
        dispatch(setRecords(res.data.records))
        return {success: true}
      }
    } catch(e) {
      return {
        success: false,
        msg: `Could not get records, please try again later.`
      }
    }
  }
}

export {
  startSaveRecord,
  startDeleteRecord,
  startSetRecords
}