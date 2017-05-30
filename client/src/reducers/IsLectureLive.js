const isLectureLive = (state = false, action) => {
  switch (action.type) {
    case 'LECTURE_LIVE' :
      return {
        isLive: action.liveLecture,
      };
    case 'LECTURE_OFF' :
      return {
        isLive: action.liveLecture,
      }
    default:
      return state;
  }
};

export default isLectureLive;
