import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import { History } from 'base';
import { Planet } from 'components';

export default class Routes extends React.Component {

  render() {
    return (
      <Router history={History}>
        <Switch>
          <Route path="/planets" exact component={Planet.Index} />
          <Route path="/planets/:id" exact component={Planet.Show} />
          <Route path="/planets/:planetId/residents" exact component={Planet.Show} />
          <Route path="/planets/:planetId/residents/:id" exact component={Planet.Show} />
          <Redirect to="/planets" />
        </Switch>
      </Router>
    );
  }

}
