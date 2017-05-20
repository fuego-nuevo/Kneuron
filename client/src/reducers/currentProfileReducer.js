
const currentProfile = (state = {}, action) => {
    switch(action.type){
      case 'CURRENT_PROFILE' : 
        return action.payload;
      default: 
        return state;
    }
}

export default currentProfile;