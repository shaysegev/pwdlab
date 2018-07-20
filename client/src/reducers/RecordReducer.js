const recordsReducerDefaultState = []

export default (state = recordsReducerDefaultState, action) => {  
  switch (action.type) {
    case 'ADD_RECORD':
      return {}
    case 'EDIT_RECORD':
      return {}
    case 'REMOVE_RECORD':
      return {}
    case 'SET_RECORD':
      return {}
    default:
      return state
  }
}
