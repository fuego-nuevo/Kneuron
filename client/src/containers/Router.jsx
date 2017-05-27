import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import FrontPage from '../components/FrontPage/FrontPage';
import Dashboard from '../components/Dashboard/Dashboard';
import UserProfile from '../components/Profile/UserProfile';
import EditProfile from '../components/Profile/EditProfile';
import SignUp from '../containers/SignUp';


class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    const { isAuthenticated, dispatch } = this.props;
    if (isAuthenticated) {
      return <Dashboard dispatch={dispatch} />;
    }
    this.props.history.push('/');
  }


  render() {
    const { dispatch, errorMessage, isAuthenticated, history } = this.props;
    return (
      <Switch>
        <Route exact path="/">
          <FrontPage
            history={history}
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
          />
        </Route>
        <Route path="/signup">
          <SignUp isAuthenticated={isAuthenticated} history={history} />
        </Route>
        <Route
          path="/dashboard"
          render={this.renderDashboard}
        />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    );
  }
    }

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
};

export default withRouter(connect(mapStateToProps)(Router));
