export default (state = {}, action) => {
  console.log(action);
  
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action._id,
        email: action.email,
        key: action.key
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

