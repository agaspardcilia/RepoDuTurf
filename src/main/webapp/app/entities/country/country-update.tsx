import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRegion } from 'app/shared/model/region.model';
import { getEntities as getRegions } from 'app/entities/region/region.reducer';
import { getEntity, updateEntity, createEntity, reset } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICountryUpdateProps {
  getEntity: ICrudGetAction<ICountry>;
  updateEntity: ICrudPutAction<ICountry>;
  createEntity: ICrudPutAction<ICountry>;
  getRegions: ICrudGetAllAction<IRegion>;
  regions: IRegion[];
  country: ICountry;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface ICountryUpdateState {
  isNew: boolean;
  regionId: number;
}

export class CountryUpdate extends React.Component<ICountryUpdateProps, ICountryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      regionId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRegions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { country } = this.props;
      const entity = {
        ...country,
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
    this.props.history.push('/entity/country');
  };

  regionUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        regionId: -1
      });
    } else {
      for (const i in this.props.regions) {
        if (id === this.props.regions[i].id.toString()) {
          this.setState({
            regionId: this.props.regions[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { country, regions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-country-heading">Create or edit a Country</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : country} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="countryNameLabel" for="countryName">
                    Country Name
                  </Label>
                  <AvField type="text" name="countryName" />
                </AvGroup>
                <AvGroup>
                  <Label for="region.id">Region</Label>
                  <AvInput type="select" className="form-control" name="region.id" onChange={this.regionUpdate}>
                    <option value="" key="0" />
                    {regions
                      ? regions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="region.id" value={this.state.regionId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/country" replace color="info">
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
  regions: storeState.region.entities,
  country: storeState.country.entity,
  loading: storeState.country.loading,
  updating: storeState.country.updating
});

const mapDispatchToProps = {
  getRegions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryUpdate);
