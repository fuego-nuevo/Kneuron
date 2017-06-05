const searchReduxForDashNavSearch = (arr, query) => {
  const searchResults = [];
  const finalResult = [];
  const term = query.toUpperCase();


  if ([].concat([], ...arr
    .filter(cohort => cohort.subject.toUpperCase().includes(term) || cohort.time.toUpperCase().includes(term))).length > 0) {
    searchResults.push([].concat([], ...[].concat([], ...arr
      .filter(cohort => cohort.subject.toUpperCase().includes(term) || cohort.time.toUpperCase().includes(term)))));
  }


  if ([].concat([], ...[].concat([], ...arr
    .map(cohort => cohort.lectures
      .filter(lecture => lecture.name.toUpperCase().includes(term))))).length > 0) {
    searchResults.push([].concat([], ...[].concat([], ...arr
      .map(cohort => cohort.lectures
       .filter(lecture => lecture.name.toUpperCase().includes(term))))));
  }


  if ([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
    .map(cohort => cohort.lectures
     .map(lecture => lecture.topics
      .filter(topic => topic.name.toUpperCase().includes(term)))))))).length > 0) {
    searchResults.push([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
      .map(cohort => cohort.lectures
       .map(lecture => lecture.topics
        .filter(topic => topic.name.toUpperCase().includes(term)))))))));
  }


  if ([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
    .map(cohort => cohort.lectures
     .map(lecture => lecture.topics
      .map(topic => topic.quizzes
        .filter(quiz => quiz.name.toUpperCase().includes(term))))))))).length > 0) {
    searchResults.push([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
      .map(cohort => cohort.lectures
       .map(lecture => lecture.topics
         .map(topic => topic.quizzes
           .filter(quiz => quiz.name.toUpperCase().includes(term))))))))));
  }


  searchResults.forEach((el) => {
    if (el !== [] || el !== undefined) {
      finalResult.push([].concat([], ...el));
    }
  });


  return [].concat([], ...finalResult);
};


module.exports = {
  searchReduxForDashNavSearch,
};
