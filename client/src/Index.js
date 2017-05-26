import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Reducers from './reducers/Index';
import App from './containers/App';

const logger = createLogger({});
const middleware = [
  thunkMiddleware,
  logger,
];
const createStoreWithMiddleware = compose(applyMiddleware(...middleware), autoRehydrate())(createStore);

const store = createStoreWithMiddleware(Reducers);

persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('app'),
);

