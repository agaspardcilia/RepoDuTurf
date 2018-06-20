import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './job-history.reducer';
import { IJobHistory } from 'app/shared/model/job-history.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobHistoryDetailProps {
  getEntity: ICrudGetAction<IJobHistory>;
  jobHistory: IJobHistory;
  match: any;
}

export class JobHistoryDetail extends React.Component<IJobHistoryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { jobHistory } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            JobHistory [<b>{jobHistory.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="startDate">Start Date</span>
              </dt>
              <dd>
                <TextFormat value={jobHistory.startDate} type="date" format={APP_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="endDate">End Date</span>
              </dt>
              <dd>
                <TextFormat value={jobHistory.endDate} type="date" format={APP_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="language">Language</span>
              </dt>
              <dd>{jobHistory.language}</dd>
              <dt>Job</dt>
              <dd>{jobHistory.job ? jobHistory.job.id : ''}</dd>
              <dt>Department</dt>
              <dd>{jobHistory.department ? jobHistory.department.id : ''}</dd>
              <dt>Employee</dt>
              <dd>{jobHistory.employee ? jobHistory.employee.id : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/job-history" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/job-history/${jobHistory.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ jobHistory }) => ({
  jobHistory: jobHistory.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryDetail);
