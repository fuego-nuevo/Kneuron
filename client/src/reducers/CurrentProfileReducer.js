const currentProfile = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_PROFILE' :
      return {
        email: action.email,
        username: action.username,
        fName: action.fName,
        lName: action.lName,
        userType: action.userType,
        cohort: action.cohort,
        image: action.image,
        id: action.id,
      }

    default:
      return state;
  }
};

export default currentProfile;
