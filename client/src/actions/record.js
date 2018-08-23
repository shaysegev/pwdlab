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
        // Adding record id to the record object
        record._id = res.data.recordId

        dispatch(addRecord(record))
        return {success: true, record}
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

const startEditRecord = (record = {}) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.put(`${recordRoutes.default}/${record._id}`, {_: encrypt(JSON.stringify(record))})
      if (res.data.success) {
        dispatch(editRecord(record))
        return {success: true, record}
      }
    } catch(e) {
      return {
        success: false,
        msg: `Could not update record, please try again.`
      }
    }
  }
}

const deleteRecord = (recordId) => ({
  type: 'DELETE_RECORD',
  recordId
})

const startDeleteRecord = (recordId) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.delete(`${recordRoutes.default}/${recordId}`)
      if (res.data.success) {
        dispatch(deleteRecord(recordId))
        return {success: true}
      }
    } catch(e) {
      return {
        success: false,
        msg: `Could not delete record, please try again.`
      }
    }
  }
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
  startAddRecord,
  startEditRecord,
  startDeleteRecord,
  startSetRecords
}