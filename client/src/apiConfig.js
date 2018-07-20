const apiV1 = '/api'

const apiRoutes = {
  users: `${apiV1}/users`,
  records: `${apiV1}/records`
}

const userRoutes = {
  default: apiRoutes.users,
  me: apiRoutes.users + '/me',
  login: apiRoutes.users + '/login',
  verifyToken: apiRoutes.users + '/verifyToken',
  logout: apiRoutes.users + '/logout',
}

const recordRoutes = {
  default: apiRoutes.apiRoutes,
}

export {
  userRoutes,
  recordRoutes
}