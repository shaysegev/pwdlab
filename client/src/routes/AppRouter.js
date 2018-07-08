import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Home from 'Components/Home'
import Dashboard from 'Components/Dashboard'
import NotFoundPage from 'Components/NotFoundPage'
import PublicRoute from './PublicRoute'
// import PrivateRoute from './PrivateRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PublicRoute path="/" component={Home} exact={true} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFoundPage} />
    </Switch>
   </div>
  </Router>
)

export default AppRouter;