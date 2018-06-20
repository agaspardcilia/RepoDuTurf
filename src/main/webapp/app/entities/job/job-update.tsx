import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { getEntity, updateEntity, createEntity, reset } from './job.reducer';
import { IJob } from 'app/shared/model/job.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IJobUpdateProps {
  getEntity: ICrudGetAction<IJob>;
  updateEntity: ICrudPutAction<IJob>;
  createEntity: ICrudPutAction<IJob>;
  getEmployees: ICrudGetAllAction<IEmployee>;
  employees: IEmployee[];
  getTasks: ICrudGetAllAction<ITask>;
  tasks: ITask[];
  job: IJob;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IJobUpdateState {
  isNew: boolean;
  idstask: any[];
  employeeId: number;
}

export class JobUpdate extends React.Component<IJobUpdateProps, IJobUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idstask: [],
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

    this.props.getEmployees();
    this.props.getTasks();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { job } = this.props;
      const entity = {
        ...job,
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
    this.props.history.push('/entity/job');
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

  taskUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idstask: keysToValues(selected, this.props.tasks, 'title')
    });
  };

  displaytask(value: any) {
    if (this.state.idstask && this.state.idstask.length !== 0) {
      const list = [];
      for (const i in this.state.idstask) {
        if (this.state.idstask[i]) {
          list.push(this.state.idstask[i].title);
        }
      }
      return list;
    }
    if (value.tasks && value.tasks.length !== 0) {
      const list = [];
      for (const i in value.tasks) {
        if (value.tasks[i]) {
          list.push(value.tasks[i].title);
        }
      }
      this.setState({
        idstask: keysToValues(list, this.props.tasks, 'title')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { job, employees, tasks, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-job-heading">Create or edit a Job</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : job} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="jobTitleLabel" for="jobTitle">
                    Job Title
                  </Label>
                  <AvField type="text" name="jobTitle" />
                </AvGroup>
                <AvGroup>
                  <Label id="minSalaryLabel" for="minSalary">
                    Min Salary
                  </Label>
                  <AvField type="number" className="form-control" name="minSalary" />
                </AvGroup>
                <AvGroup>
                  <Label id="maxSalaryLabel" for="maxSalary">
                    Max Salary
                  </Label>
                  <AvField type="number" className="form-control" name="maxSalary" />
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
                <AvGroup>
                  <Label for="tasks">Task</Label>
                  <AvInput
                    type="select"
                    multiple
                    className="form-control"
                    name="faketasks"
                    value={this.displaytask(job)}
                    onChange={this.taskUpdate}
                  >
                    <option value="" key="0" />
                    {tasks
                      ? tasks.map(otherEntity => (
                          <option value={otherEntity.title} key={otherEntity.id}>
                            {otherEntity.title}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="tasks" value={this.state.idstask} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/job" replace color="info">
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
  employees: storeState.employee.entities,
  tasks: storeState.task.entities,
  job: storeState.job.entity,
  loading: storeState.job.loading,
  updating: storeState.job.updating
});

const mapDispatchToProps = {
  getEmployees,
  getTasks,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(JobUpdate);
