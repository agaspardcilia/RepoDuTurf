import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Job from './job';
import JobDetail from './job-detail';
import JobUpdate from './job-update';
import JobDeleteDialog from './job-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={JobUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={JobUpdate} />
      <Route exact path={`${match.url}/:id`} component={JobDetail} />
      <Route path={match.url} component={Job} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={JobDeleteDialog} />
  </>
);

export default Routes;
