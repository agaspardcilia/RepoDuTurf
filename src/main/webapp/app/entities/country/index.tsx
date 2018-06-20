import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Country from './country';
import CountryDetail from './country-detail';
import CountryUpdate from './country-update';
import CountryDeleteDialog from './country-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CountryUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CountryUpdate} />
      <Route exact path={`${match.url}/:id`} component={CountryDetail} />
      <Route path={match.url} component={Country} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CountryDeleteDialog} />
  </>
);

export default Routes;
