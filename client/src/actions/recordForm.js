import { 
  LOADING_MODE,
  INIT_MODE,
  VIEW_RECORD_MODE,
  ADD_RECORD_MODE,
  EDIT_RECORD_MODE
} from 'Actions/types/recordForm'

const setLoadingMode = () => ({
  type: LOADING_MODE
})

const setInitRecordMode = () => ({
  type: INIT_MODE
})

const setViewRecordMode = (record) => ({
  type: VIEW_RECORD_MODE,
  record
})

const setAddRecordMode = () => ({
  type: ADD_RECORD_MODE
})

const setEditRecordMode = (record) => ({
  type: EDIT_RECORD_MODE,
  record
})

export {
  setLoadingMode,
  setInitRecordMode,
  setViewRecordMode,
  setAddRecordMode,
  setEditRecordMode,
}