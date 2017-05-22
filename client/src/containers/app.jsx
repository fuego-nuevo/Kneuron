import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routing';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    );
  }
}

export default App;
