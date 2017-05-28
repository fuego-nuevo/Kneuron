const CurrentLiveLecture = (state = {}, action) => {
  switch (action.type) {
    case 'LIVE_LECTURE' :
      return {
        liveLectureId: action.lectureId,
        liveLectureName: action.name,
        liveLectureTopics: action.topics,
      };

    default:
      return state;
  }
};

export default CurrentLiveLecture;
