import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './job.reducer';
import { IJob } from 'app/shared/model/job.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobDetailProps {
  getEntity: ICrudGetAction<IJob>;
  job: IJob;
  match: any;
}

export class JobDetail extends React.Component<IJobDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { job } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Job [<b>{job.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="jobTitle">Job Title</span>
              </dt>
              <dd>{job.jobTitle}</dd>
              <dt>
                <span id="minSalary">Min Salary</span>
              </dt>
              <dd>{job.minSalary}</dd>
              <dt>
                <span id="maxSalary">Max Salary</span>
              </dt>
              <dd>{job.maxSalary}</dd>
              <dt>Employee</dt>
              <dd>{job.employee ? job.employee.id : ''}</dd>
              <dt>Task</dt>
              <dd>
                {job.tasks
                  ? job.tasks.map((val, i) => (
                      <span key={val.id}>
                        <a>{val.title}</a>
                        {i === job.tasks.length - 1 ? '' : ', '}
                      </span>
                    ))
                  : null}
              </dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/job" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/job/${job.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ job }) => ({
  job: job.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);
