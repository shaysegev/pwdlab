export default (state = {}, action) => {  
  switch (action.type) {
    case 'LOGIN':
      return {
        email: action.email,
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

