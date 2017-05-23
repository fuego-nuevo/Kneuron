import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routing';
import EditProfile from '../components/editProfile';


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
