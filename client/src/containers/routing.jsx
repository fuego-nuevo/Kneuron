import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import FrontPage from '../components/frontPage';
import Dashboard from '../components/Dashboard';
import UserProfile from '../components/userProfile';

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? <Dashboard /> : <Redirect to="/" />;
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
        <Route path="/dashboard" render={this.renderDashboard} />
        <Route path="/signup" component={UserProfile} />
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

export default connect(mapStateToProps)(withRouter(Router));
