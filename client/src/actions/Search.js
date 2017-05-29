exports.reduxDataSearch = (results) => {
  console.log("THIS ARE RESULTS FROM SEARCH IN DASHNAV: ", results);
  return {
    type: 'SEARCH_REDUX_DATA',
    searchedResults: [[].concat([], ...results.map(result => result)).filter(el => el.lectures), [].concat([], ...results.map(result => result)).filter(el => !el.lectures && typeof el.cohort_id === 'number'), [].concat([], ...results.map(result => result)).filter(el => !el.lectures && !el.topics && typeof el.lecture_id === 'number'), [].concat([], ...results.map(result => result)).filter(el => !el.lectures && !el.topics && typeof el.topic_id === 'number' && !el.quizzes)],
    // searchCohorts: [].concat([], ...results.map(result => result.map(data => data))).filter(el => el.lectures),
    // searchLetures: [].concat([], ...results.map(result => result.map(data => data))).filter(el => !el.lectures && el.topics.length && typeof el.cohort_id === 'number'),
    // searchTopics: [].concat([], ...results.map(result => result.map(data => data))).filter(el => !el.lectures && !el.topics && typeof el.lecture_id === 'number'),
    // searchQuizzes: [].concat([], ...results.map(result => result.map(data => data))).filter(el => !el.lectures && !el.topics && typeof el.topic_id === 'number' && !el.quizzes),
  }
}
