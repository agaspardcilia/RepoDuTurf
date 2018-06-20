import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Task from './task';
import TaskDetail from './task-detail';
import TaskUpdate from './task-update';
import TaskDeleteDialog from './task-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={TaskUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={TaskUpdate} />
      <Route exact path={`${match.url}/:id`} component={TaskDetail} />
      <Route path={match.url} component={Task} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={TaskDeleteDialog} />
  </>
);

export default Routes;
