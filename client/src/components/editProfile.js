import React, { Component } from 'react';



class Profile extends Component {
  constructor(){
    super();

    this.state = {

    };
  }




  render(){
    return(
      <div className="contents">
        <p>In The Profile Component</p>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    profile: authSelectors.getProfile(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
