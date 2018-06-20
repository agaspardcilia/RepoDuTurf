import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Location from './location';
import LocationDetail from './location-detail';
import LocationUpdate from './location-update';
import LocationDeleteDialog from './location-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={LocationUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={LocationUpdate} />
      <Route exact path={`${match.url}/:id`} component={LocationDetail} />
      <Route path={match.url} component={Location} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={LocationDeleteDialog} />
  </>
);

export default Routes;
