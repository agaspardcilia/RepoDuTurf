import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps {
  getEntity: ICrudGetAction<IEmployee>;
  employee: IEmployee;
  match: any;
}

export class EmployeeDetail extends React.Component<IEmployeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employee } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Employee [<b>{employee.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="firstName">First Name</span>
                <UncontrolledTooltip target="firstName">The firstname attribute.</UncontrolledTooltip>
              </dt>
              <dd>{employee.firstName}</dd>
              <dt>
                <span id="lastName">Last Name</span>
              </dt>
              <dd>{employee.lastName}</dd>
              <dt>
                <span id="email">Email</span>
              </dt>
              <dd>{employee.email}</dd>
              <dt>
                <span id="phoneNumber">Phone Number</span>
              </dt>
              <dd>{employee.phoneNumber}</dd>
              <dt>
                <span id="hireDate">Hire Date</span>
              </dt>
              <dd>
                <TextFormat value={employee.hireDate} type="date" format={APP_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="salary">Salary</span>
              </dt>
              <dd>{employee.salary}</dd>
              <dt>
                <span id="commissionPct">Commission Pct</span>
              </dt>
              <dd>{employee.commissionPct}</dd>
              <dt>Department</dt>
              <dd>{employee.department ? employee.department.id : ''}</dd>
              <dt>Manager</dt>
              <dd>{employee.manager ? employee.manager.id : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/employee" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/employee/${employee.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ employee }) => ({
  employee: employee.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
