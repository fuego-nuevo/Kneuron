import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
<<<<<<< HEAD:client/src/index.js
import App from './containers/App.jsx';
import Reducers from './reducers/Index';
import thunkMiddleware from 'redux-thunk';
=======
>>>>>>> edeb15198d4cf381160e195e8aa682633f342e76:client/src/Index.js
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Reducers from './reducers/Index';
import App from './containers/App';

const logger = createLogger({});
const middleware = [
  thunkMiddleware,
  logger,
];
<<<<<<< HEAD:client/src/index.js

=======
>>>>>>> edeb15198d4cf381160e195e8aa682633f342e76:client/src/Index.js
const createStoreWithMiddleware = compose(applyMiddleware(...middleware), autoRehydrate())(createStore);

const store = createStoreWithMiddleware(Reducers);

persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('app'),
);
