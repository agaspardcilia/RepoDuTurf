import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IJob } from 'app/shared/model/job.model';
import { getEntities as getJobs } from 'app/entities/job/job.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './job-history.reducer';
import { IJobHistory } from 'app/shared/model/job-history.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IJobHistoryUpdateProps {
  getEntity: ICrudGetAction<IJobHistory>;
  updateEntity: ICrudPutAction<IJobHistory>;
  createEntity: ICrudPutAction<IJobHistory>;
  getJobs: ICrudGetAllAction<IJob>;
  jobs: IJob[];
  getDepartments: ICrudGetAllAction<IDepartment>;
  departments: IDepartment[];
  getEmployees: ICrudGetAllAction<IEmployee>;
  employees: IEmployee[];
  jobHistory: IJobHistory;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IJobHistoryUpdateState {
  isNew: boolean;
  jobId: number;
  departmentId: number;
  employeeId: number;
}

export class JobHistoryUpdate extends React.Component<IJobHistoryUpdateProps, IJobHistoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      jobId: 0,
      departmentId: 0,
      employeeId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getJobs();
    this.props.getDepartments();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = new Date(values.startDate);
    values.endDate = new Date(values.endDate);

    if (errors.length === 0) {
      const { jobHistory } = this.props;
      const entity = {
        ...jobHistory,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/job-history');
  };

  jobUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        jobId: -1
      });
    } else {
      for (const i in this.props.jobs) {
        if (id === this.props.jobs[i].id.toString()) {
          this.setState({
            jobId: this.props.jobs[i].id
          });
        }
      }
    }
  };

  departmentUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        departmentId: -1
      });
    } else {
      for (const i in this.props.departments) {
        if (id === this.props.departments[i].id.toString()) {
          this.setState({
            departmentId: this.props.departments[i].id
          });
        }
      }
    }
  };

  employeeUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        employeeId: -1
      });
    } else {
      for (const i in this.props.employees) {
        if (id === this.props.employees[i].id.toString()) {
          this.setState({
            employeeId: this.props.employees[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { jobHistory, jobs, departments, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-job-history-heading">Create or edit a JobHistory</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : jobHistory} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    Start Date
                  </Label>
                  <AvInput
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.jobHistory.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="endDate">
                    End Date
                  </Label>
                  <AvInput
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.jobHistory.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="languageLabel">Language</Label>
                  <AvInput type="select" className="form-control" name="language" value={(!isNew && jobHistory.language) || 'FRENCH'}>
                    <option value="FRENCH">FRENCH</option>
                    <option value="ENGLISH">ENGLISH</option>
                    <option value="SPANISH">SPANISH</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="job.id">Job</Label>
                  <AvInput type="select" className="form-control" name="job.id" onChange={this.jobUpdate}>
                    <option value="" key="0" />
                    {jobs
                      ? jobs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="job.id" value={this.state.jobId} />
                </AvGroup>
                <AvGroup>
                  <Label for="department.id">Department</Label>
                  <AvInput type="select" className="form-control" name="department.id" onChange={this.departmentUpdate}>
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="department.id" value={this.state.departmentId} />
                </AvGroup>
                <AvGroup>
                  <Label for="employee.id">Employee</Label>
                  <AvInput type="select" className="form-control" name="employee.id" onChange={this.employeeUpdate}>
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="employee.id" value={this.state.employeeId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/job-history" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  jobs: storeState.job.entities,
  departments: storeState.department.entities,
  employees: storeState.employee.entities,
  jobHistory: storeState.jobHistory.entity,
  loading: storeState.jobHistory.loading,
  updating: storeState.jobHistory.updating
});

const mapDispatchToProps = {
  getJobs,
  getDepartments,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryUpdate);
