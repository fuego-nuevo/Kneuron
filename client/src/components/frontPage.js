import React, { Component } from 'react';

class FrontPage extends Component {
  render() {
    return(
      <div>
        <form>
          <input type="text" placeholder="First Name"></input>
          <input type="text" placeholder="Last Name"></input>
          <input type="text" placeholder="UserName"></input>
          <input type="text" placeholder="Password"></input>
          <input type="submit">submit</input>
        </form>
      </div>
    );
  }
}


export default FrontPage;