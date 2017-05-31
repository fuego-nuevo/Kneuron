import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import '../../../node_modules/sweetalert/dist/sweetalert.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  }
}

export default App;

