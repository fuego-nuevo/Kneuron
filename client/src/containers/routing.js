import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
import Login from '../components/login';
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import FrontPage from '../components/frontPage';
import Dashboard from '../components/Dashboard';
import UserProfile from '../components/userProfile';

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticate: props.isAuthenticated,
    }
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderDashboard() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? <Dashboard /> : <Redirect to="/" />
  }


  render() {
    const { dispatch, errorMessage, isAuthenticated, history } = this.props;
    console.log('this is routing');
    return(
          <Switch>
            <Route exact path="/">
              <FrontPage
                history={history}
                isAuthenticated={isAuthenticated}
                errorMessage={errorMessage}
                dispatch={dispatch}
              />
            </Route>
            <Route path="/dashboard" render={this.renderDashboard}/>
          </Switch>
        );
      }
    }

const mapStateToProps = state => {
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(withRouter(Router));
