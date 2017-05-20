import React from "react";
import {Provider} from "react-redux";
import {configure, authStateReducer} from "redux-auth";
import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import {AuthGlobals} from "redux-auth/default-theme";

class App extends React.Component {
  render() {
    return (
      <div>
        <AuthGlobals />
        {this.props.children}
      </div>
    );
  }
}

const reducer = combineReducers({
  auth: authStateReducer,
});

const store = compose(applyMiddleware(thunk))(createStore)(reducer);
export function renderApp({cookies, isServer, currentLocation} = {}) {
  store.dispatch(configure(
    {apiUrl: "http://api.catfancy.com"},
    {isServer, cookies, currentLocation}
  )).then(({redirectPath, blank} = {}) => {
    if (blank) {
      return <noscript />;
    } else {
      return (
        <Provider store={store} key="provider">
          <App />
        </Provider>
      );
    }
  });
}