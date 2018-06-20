import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryDetailProps {
  getEntity: ICrudGetAction<ICountry>;
  country: ICountry;
  match: any;
}

export class CountryDetail extends React.Component<ICountryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { country } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Country [<b>{country.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="countryName">Country Name</span>
              </dt>
              <dd>{country.countryName}</dd>
              <dt>Region</dt>
              <dd>{country.region ? country.region.id : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/country" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          <Button tag={Link} to={`/entity/country/${country.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ country }) => ({
  country: country.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);
