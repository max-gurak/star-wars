import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import { History } from 'base';
import { Planet, Layout, People, HttpErrors } from 'components';

export default class Routes extends React.Component {

  render() {
    return (
      <Layout.Stars>
        <Router history={History}>
          <Switch>
            <Route path="/planets" exact component={Planet.Index} />
            <Route path="/planets/:id" exact component={Planet.Show} />
            <Route path="/people/:id" exact component={People.Show} />
            <Route path="/404" exact component={HttpErrors.NotFound} />
            <Redirect to="/planets" />
          </Switch>
        </Router>
      </Layout.Stars>
    );
  }

}
