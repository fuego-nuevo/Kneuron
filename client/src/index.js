<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import { renderApp } from '../src/components/app';

const reactRoot = window.document.getElementById("root");
renderApp().then(appComponent => {
  ReactDOM.render(appComponent, reactRoot);
});
=======
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import Reducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';
// import api from './middleware/api';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

const store = createStoreWithMiddleware(Reducers);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, 
      document.getElementById('app')
      );
>>>>>>> e805e2a27b5f24ee49c1e868cefdef7d02973be3
