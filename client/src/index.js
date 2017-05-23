import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app.jsx';
import Reducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';
// import api from './middleware/api';
import { createLogger } from 'redux-logger';
const logger = createLogger({});
const middleware = [
  thunkMiddleware,
  logger,
]
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const store = createStoreWithMiddleware(Reducers);
console.log("this is my store on line 13", store)
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('app')
);

