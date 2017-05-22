exports.getProfile = (profile) => {
  console.log("this is the profile in actions ", profile);
  return {
    type: 'CURRENT_PROFILE',
    payload: profile
  };
}

