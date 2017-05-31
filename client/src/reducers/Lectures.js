const Lectures = (state = {}, action) => {
  console.log(action.currentCohortId);
  switch (action.type) {
    case 'ALL_LECTURES' :
      return {
        lectures: action.lectures,
        currentCohortId: action.currentCohortId,
      }

    default:
      return state;
  }
};

export default Lectures;
