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


  handleSearchInput(query){
    this.setState({ text: query.target.value});
  }


  handleSearchSubmit(e){
    e.preventDefault();
    console.log('this is the props in this fucking crazy submit ', this.props)
    const data = this.props.cohort;
    const query = this.state.text;
    const searchResult = searchReduxForDashNavSearch(data, query);
    this.props.reduxDataSearch(searchResult);
    this.props.history.push('/dashboard/search');
  }


  render() {
    console.log("Input is: ", this.props);
    return (
      <nav className="dash-nav">
        <div className="dash-nav-items">
          <button><Link to="/dashboard">Home</Link></button>
          <button><Link to="/dashboard/class">Classes</Link></button>
          <button className={this.props.isLive ? '' : 'disabled'}><Link to="/dashboard/livelecture">live-lecture</Link></button>
        </div>
        <div className="search-container">
          <form>
            <input onChange={this.handleSearchInput} className="nav-search" placeholder="   search . . ." type="text" />
            <button onClick={this.handleSearchSubmit} className="nav-search-submit"><input className="search-btn" type="submit" value="Search" /></button>
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
