import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from 'Components/Home'
import Dashboard from 'Components/Dashboard'
import NotFoundPage from 'Components/NotFoundPage'

const AppRouter = () => (
  <BrowserRouter>
  <div>
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFoundPage} />
    </Switch>
   </div>
  </BrowserRouter>
);

export default AppRouter; 