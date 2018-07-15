const apiV1 = '/api'

const apiRoutes = {
  users: `${apiV1}/users`
}

const userRoutes = {
  default: apiRoutes.users,
  me: apiRoutes.users + '/me',
  login: apiRoutes.users + '/login',
  verifyToken: apiRoutes.users + '/verifyToken',
  logout: apiRoutes.users + '/logout',
}

export {
  userRoutes
}