import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import FrontPage from '../components/frontPage';
import Dashboard from '../components/Dashboard';
import SignUp from '../containers/signUp';

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
  }


  render() {
    console.log(this.props, 'line 25 props router')
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


