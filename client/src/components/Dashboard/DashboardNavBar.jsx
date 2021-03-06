import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/Login';
import { lectureOff } from '../../actions/IsLectureLive';
import { searchReduxForDashNavSearch } from '../../utils/dashNavSearchHelperFunctions';
import '../../styles/Main.css';

class DashNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchInput(query) {
    this.setState({ text: query.target.value });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const data = this.props.cohort;
    const query = this.state.text;
    const searchResult = searchReduxForDashNavSearch(data, query);
    this.props.reduxDataSearch(searchResult);
    this.props.history.push('/dashboard/search');
  }

  render() {
    return (
      <nav className="dash-nav">
        <div className="dash-nav-items">
          <button><Link to="/dashboard/home">Home</Link></button>
          <button><Link to="/dashboard/class">Classes</Link></button>
          <button><Link to="/dashboard/performance">Performance</Link></button>
        </div>
        <div className="search-container">
          <form onSubmit={this.handleSearchSubmit}>
            <input onChange={this.handleSearchInput} className="nav-search" placeholder="   search . . ." type="text" />
            <input className="search-btn hidden" type="submit" value="Search" />
          </form>
        </div>
        <button id="dash-logout"><Link onClick={() => { this.props.lectureOff(); this.props.dispatch(logoutUser()); }} to="/">Logout</Link></button>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isLive: state.isLive,
});

export default connect(mapStateToProps, { lectureOff })(DashNav);
