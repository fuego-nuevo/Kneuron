exports.reduxDataSearch = (results) => {
  return {
    type: 'SEARCH_REDUX_DATA',
    searchedResults: [
      [].concat([], ...results.map(result => result))
      .filter(el => el.lectures),
      [].concat([], ...results.map(result => result))
      .filter(el => !el.lectures && typeof el.cohort_id === 'number'),
      [].concat([], ...results.map(result => result))
      .filter(el => !el.lectures && !el.topics && typeof el.lecture_id === 'number'),
      [].concat([], ...results.map(result => result))
      .filter(el => !el.lectures && !el.topics && typeof el.topic_id === 'number' && !el.quizzes),
    ],
  }
}
