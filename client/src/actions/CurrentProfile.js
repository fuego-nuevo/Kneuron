exports.updateProfile = profile => ({
  type: 'CURRENT_PROFILE',
  email: profile.data.email,
  username: profile.data.username,
  fName: profile.data.fName,
  lName: profile.data.lName,
  userType: profile.data.userType,
  cohort: profile.data.cohort,
  image: profile.data.image,
  id: profile.data.id,
});

