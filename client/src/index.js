import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import Reducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('app'),
);

