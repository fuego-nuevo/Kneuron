const Lectures = (state = {}, action) => {
  switch (action.type) {
    case 'ALL_LECTURES' :
      return {
        lectures: action.lectures,
      }

    default:
      return state;
  }
};

export default Lectures;
