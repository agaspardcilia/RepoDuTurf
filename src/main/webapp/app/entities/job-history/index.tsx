import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import JobHistory from './job-history';
import JobHistoryDetail from './job-history-detail';
import JobHistoryUpdate from './job-history-update';
import JobHistoryDeleteDialog from './job-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={JobHistoryUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={JobHistoryUpdate} />
      <Route exact path={`${match.url}/:id`} component={JobHistoryDetail} />
      <Route path={match.url} component={JobHistory} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={JobHistoryDeleteDialog} />
  </>
);

export default Routes;
