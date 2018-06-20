import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps {
  getEntity: ICrudGetAction<ILocation>;
  location: ILocation;
  match: any;
}

export class LocationDetail extends React.Component<ILocationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { location } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Location [<b>{location.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="streetAddress">Street Address</span>
              </dt>
              <dd>{location.streetAddress}</dd>
              <dt>
                <span id="postalCode">Postal Code</span>
              </dt>
              <dd>{location.postalCode}</dd>
              <dt>
                <span id="city">City</span>
              </dt>
              <dd>{location.city}</dd>
              <dt>
                <span id="stateProvince">State Province</span>
              </dt>
              <dd>{location.stateProvince}</dd>
              <dt>Country</dt>
              <dd>{location.country ? location.country.id : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/location" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/location/${location.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ location }) => ({
  location: location.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
