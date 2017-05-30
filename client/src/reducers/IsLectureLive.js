const isLectureLive = (state = false, action) => {
  switch (action.type) {
    case 'IS_LECTURE_LIVE' :
      return {
        isLive: action.liveLecture,
      };
    default:
      return state;
  }
};

export default isLectureLive;
