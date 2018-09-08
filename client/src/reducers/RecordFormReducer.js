import { 
  LOADING_MODE,
  INIT_MODE,
  VIEW_RECORD_MODE,
  ADD_RECORD_MODE,
  EDIT_RECORD_MODE
} from 'Actions/types/recordForm'

export default (state = { record: null }, action) => {
  switch (action.type) {
    case LOADING_MODE:
     return {
       record: null,
       mode: LOADING_MODE
     }
    case INIT_MODE:
      return {
        record: null,
        mode: INIT_MODE
      }
    case VIEW_RECORD_MODE:
      return {
        mode: VIEW_RECORD_MODE,
        record: action.record
      }
    case ADD_RECORD_MODE:
      return {
        record: null,
        mode: ADD_RECORD_MODE
      }
    case EDIT_RECORD_MODE:
      return {
        mode: EDIT_RECORD_MODE, 
        record: action.record
      }
    default:
      return state
  }
}
