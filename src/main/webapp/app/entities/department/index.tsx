import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Department from './department';
import DepartmentDetail from './department-detail';
import DepartmentUpdate from './department-update';
import DepartmentDeleteDialog from './department-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={DepartmentUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={DepartmentUpdate} />
      <Route exact path={`${match.url}/:id`} component={DepartmentDetail} />
      <Route path={match.url} component={Department} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={DepartmentDeleteDialog} />
  </>
);

export default Routes;
