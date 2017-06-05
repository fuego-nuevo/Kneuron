import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAdmin } from '../../actions/Login';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    const { loginAdmin, history } = this.props;
    console.log(this.props);
    return (
      <div className="admin">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginAdmin(this.state, history);
          }}
          className="signup-form"
          autoComplete="on"
        >
          <div className="signup-header">ADMIN LOGIN</div>
          <div className="signup-info-container">
            <div className="signup-info">
              <div><label htmlFor="email">Email</label></div>
              <input onChange={this.handleChange} name="email" value={this.state.email} type="email" />
              <div><label htmlFor="password">password</label></div>
              <input
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                type="password"
              />
              <input id="signup-button" type="submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default connect(null, { loginAdmin })(AdminLogin);
