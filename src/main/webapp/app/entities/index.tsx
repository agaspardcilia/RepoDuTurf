import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import Region from './region';
import Country from './country';
import Location from './location';
import Department from './department';
import Task from './task';
import Employee from './employee';
import Job from './job';
import JobHistory from './job-history';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <Route path={`${match.url}/region`} component={Region} />
      <Route path={`${match.url}/country`} component={Country} />
      <Route path={`${match.url}/location`} component={Location} />
      <Route path={`${match.url}/department`} component={Department} />
      <Route path={`${match.url}/task`} component={Task} />
      <Route path={`${match.url}/employee`} component={Employee} />
      <Route path={`${match.url}/job`} component={Job} />
      <Route path={`${match.url}/job-history`} component={JobHistory} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
