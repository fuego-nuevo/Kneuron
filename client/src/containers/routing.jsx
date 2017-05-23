import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import FrontPage from '../components/frontPage';
import Dashboard from '../components/Dashboard';
import SignUp from '../containers/signUp';
import { forceRefresh } from '../utils/forceRefresh';

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Dashboard />;
    }
    this.props.history.push('/');
    forceRefresh();
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
<<<<<<< HEAD
        <Route path="/signup">
          <SignUp isAuthenticated={isAuthenticated} history={history} />
        </Route>
=======
>>>>>>> moreRoutes
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
