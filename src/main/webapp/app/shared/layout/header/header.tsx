import './header.css';

import * as React from 'react';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import appConfig from 'app/config/constants';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

export interface IHeaderState {
  menuOpen: boolean;
}

const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="static/images/logo-jhipster-react.svg" alt="Logo" />
  </div>
);

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { isAuthenticated, isAdmin } = this.props;
    const entityMenuItems = [
      <DropdownItem tag={Link} key="region" to="/entity/region">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Region
      </DropdownItem>,
      <DropdownItem tag={Link} key="country" to="/entity/country">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Country
      </DropdownItem>,
      <DropdownItem tag={Link} key="location" to="/entity/location">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Location
      </DropdownItem>,
      <DropdownItem tag={Link} key="department" to="/entity/department">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Department
      </DropdownItem>,
      <DropdownItem tag={Link} key="task" to="/entity/task">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Task
      </DropdownItem>,
      <DropdownItem tag={Link} key="employee" to="/entity/employee">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Employee
      </DropdownItem>,
      <DropdownItem tag={Link} key="job" to="/entity/job">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Job
      </DropdownItem>,
      <DropdownItem tag={Link} key="job-history" to="/entity/job-history">
        <FontAwesomeIcon icon="asterisk" />&nbsp; Job History
      </DropdownItem>,
      /* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */
      <span key="dummy-placeholder" /> /* workaround to avoid error when there are no entities */
    ];
    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
    const adminMenuItems = [
      <DropdownItem tag={Link} key="user-management" to="/admin/user-management">
        <FontAwesomeIcon icon="user" /> User Management
      </DropdownItem>,
      <DropdownItem tag={Link} key="metrics" to="/admin/metrics">
        <FontAwesomeIcon icon="tachometer-alt" /> Metrics
      </DropdownItem>,
      <DropdownItem tag={Link} key="health" to="/admin/health">
        <FontAwesomeIcon icon="heart" /> Health
      </DropdownItem>,
      <DropdownItem tag={Link} key="configuration" to="/admin/configuration">
        <FontAwesomeIcon icon="list" /> Configuration
      </DropdownItem>,
      <DropdownItem tag={Link} key="audits" to="/admin/audits">
        <FontAwesomeIcon icon="bell" /> Audits
      </DropdownItem>,
      /* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */
      <DropdownItem tag={Link} key="logs" to="/admin/logs">
        <FontAwesomeIcon icon="tasks" /> Logs
      </DropdownItem>
    ];

    const swaggerItem = (
      <DropdownItem tag={Link} key="docs" to="/admin/docs">
        <FontAwesomeIcon icon="book" /> API Docs
      </DropdownItem>
    );

    const databaseItem = [
      <DropdownItem tag="a" key="h2-console" href="./h2-console" target="_tab">
        <FontAwesomeIcon icon="hdd" /> Database
      </DropdownItem>
    ];

    const accountMenuItems = [];
    if (isAuthenticated) {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="settings" to="/account/settings">
          <FontAwesomeIcon icon="wrench" /> Settings
        </DropdownItem>,
        <DropdownItem tag={Link} key="password" to="/account/password">
          <FontAwesomeIcon icon="clock" /> Password
        </DropdownItem>,
        <DropdownItem tag={Link} key="logout" to="/logout">
          <FontAwesomeIcon icon="sign-out-alt" /> Logout
        </DropdownItem>
      );
    } else {
      accountMenuItems.push(
        <DropdownItem tag={Link} key="login" to="/login">
          <FontAwesomeIcon icon="sign-in-alt" /> Login
        </DropdownItem>,
        <DropdownItem tag={Link} key="register" to="/register">
          <FontAwesomeIcon icon="sign-in-alt" /> Register
        </DropdownItem>
      );
    }

    const entitiesMenu = (
      <UncontrolledDropdown nav inNavbar key="entities">
        <DropdownToggle nav caret className="d-flex align-items-center">
          <FontAwesomeIcon icon="th-list" />
          <span>Entities</span>
        </DropdownToggle>
        <DropdownMenu right>{entityMenuItems}</DropdownMenu>
      </UncontrolledDropdown>
    );
    const adminMenu = (
      <UncontrolledDropdown nav inNavbar key="admin">
        <DropdownToggle nav caret className="d-flex align-items-center">
          <FontAwesomeIcon icon="user-plus" />
          <span>Administration</span>
        </DropdownToggle>
        <DropdownMenu right style={{ width: '130%' }}>
          {adminMenuItems}
          {this.props.isSwaggerEnabled ? swaggerItem : null}

          {!this.props.isInProduction ? databaseItem : null}
        </DropdownMenu>
      </UncontrolledDropdown>
    );

    return (
      <div id="app-header">
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <NavbarBrand tag={Link} to="/" className="brand-logo">
            <BrandIcon />
            <span className="brand-title">JhipsterSampleApplication</span>
            <span className="navbar-version">{appConfig.VERSION}</span>
          </NavbarBrand>
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" className="d-flex align-items-center">
                  <FontAwesomeIcon icon="home" />
                  <span>Home</span>
                </NavLink>
              </NavItem>
              {isAuthenticated ? (isAdmin ? [entitiesMenu, adminMenu] : entitiesMenu) : null}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="d-flex align-items-center">
                  <FontAwesomeIcon icon="user" />
                  <span>Account</span>
                </DropdownToggle>
                <DropdownMenu right>{accountMenuItems}</DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
