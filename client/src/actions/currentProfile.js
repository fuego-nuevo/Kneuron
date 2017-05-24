exports.updateProfile = (profile) => {
  return {
    type: 'CURRENT_PROFILE',
    email: profile.data.email,
    username: profile.data.username,
    fName: profile.data.fName,
    lName: profile.data.lName,
    userType: profile.data.userType,
    cohort: profile.data.cohort,
  };
}

//I gotta create an action to make currentLecture the selected or Clicked Lecture from lecture list
//then pass along routing to redux and stuff 
