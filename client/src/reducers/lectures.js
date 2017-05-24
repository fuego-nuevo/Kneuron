const Lectures = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_LECTURE' :
      return {
        lectureId: action.lectureId,
        name: action.name,
        topics: action.topics,
        selected: true
      }

    case 'ALL_LECTURES' : 
      return {
        lectures: action.lectures,
      }

    default:
      return state;
  }
};

export default Lectures;
