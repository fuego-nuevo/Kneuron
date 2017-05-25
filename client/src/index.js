import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app.jsx';
import Reducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'

const logger = createLogger({});
const middleware = [
  thunkMiddleware,
  logger,
];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);


const store = createStoreWithMiddleware(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('app'),
);

