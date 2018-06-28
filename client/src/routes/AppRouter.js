import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home'
import NotFoundPage from '../components/NotFoundPage'

const AppRouter = () => (
  <BrowserRouter>
  <div>
    <Switch>
      <Route path="/" component={Home} exact={true} />
      {/* <Route path="/create" component={addExpensePage} /> */}
      {/* <Route path="/edit/:id?" component={editExpensePage} /> */}
      {/* <Route path="/help" component={helpPage} /> */}
      <Route component={NotFoundPage} />
    </Switch>
   </div>
  </BrowserRouter>
);

export default AppRouter; 