exports.getProfile = (profile) => {
  return {
    type: 'CURRENT_PROFILE',
    payload: profile
  };
}

