import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
import Login from '../components/login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontPage from '../components/frontPage';
import UserProfile from '../components/userProfile';

class Router extends Component {
  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props;
    console.log(this.props, 'this is auth nonsense going on');
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <FrontPage
                isAuthenticated={isAuthenticated}
                errorMessage={errorMessage}
                dispatch={dispatch}
            />
            </Route>
            <Route path="/userprofile" component={UserProfile}/>
          </Switch>
        </div>
      </BrowserRouter>
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

export default connect(mapStateToProps)(Router);
