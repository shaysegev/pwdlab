/**
 * @const {string} API V1 endpoint
 */
const apiV1 = '/api'

/**
 * @const {string} Current API endpoint
 */
const API = apiV1;

/**
 * @const {object} API main routes
 */
const apiRoutes = {
  users: `${API}/users`,
  records: `${API}/records`
}

/**
 * @const {object} API user routes
 */
const userRoutes = {
  default: apiRoutes.users,
  me: apiRoutes.users + '/me',
  login: apiRoutes.users + '/login',
  verifyToken: apiRoutes.users + '/verifyToken',
  logout: apiRoutes.users + '/logout',
}

/**
 * @const {object} API records routes
 */
const recordRoutes = {
  default: apiRoutes.records,
}

export {
  userRoutes,
  recordRoutes
}