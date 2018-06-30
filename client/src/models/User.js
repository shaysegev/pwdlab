import axios from 'axios';

class User {
  signUp(user) {
    return axios.post('/api/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    });
  }
}

export default User