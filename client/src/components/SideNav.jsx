import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import swal from 'sweetalert';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, MenuItem, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import './styles/styles.css';
import { hashHistory } from 'react-router';


class SideNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar className="meny" style={{backgroundColor: "black", border: '1px solid gray'}} inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home">Kneuron</Link>
            <Link to="/profile" />
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: authSelectors.getProfile(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
