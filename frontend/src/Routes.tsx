import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {<Dashboard />}
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
