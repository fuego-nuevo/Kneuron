//searchReduxForDashNavSearch


const searchReduxForDashNavSearch = (arr, query) => {
  let searchResults = [];
  let finalResult = [];
  let term = query.toUpperCase();


  if([].concat([], ...arr
    .filter(cohort => cohort.subject.toUpperCase().includes(term) || cohort.time.toUpperCase().includes(term))).length > 0){
    searchResults.push([].concat([], ...[].concat([], ...arr
      .filter(cohort => cohort.subject.toUpperCase().includes(term) || cohort.time.toUpperCase().includes(term)))));
  }


  console.log("searchResults check after cohorts", searchResults);
  console.log("\n\n");


  if([].concat([], ...[].concat([], ...arr
    .map(cohort => cohort.lectures
      .filter(lecture => lecture.name.toUpperCase().includes(term))))).length > 0){
    searchResults.push([].concat([], ...[].concat([], ...arr
      .map(cohort => cohort.lectures
       .filter(lecture => lecture.name.toUpperCase().includes(term))))));
  }


  console.log("Search Results after lectures check: ", searchResults);
  console.log("\n\n");


  if([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
    .map(cohort => cohort.lectures
     .map(lecture => lecture.topics
      .filter(topic => topic.name.toUpperCase().includes(term)))))))).length > 0){
    searchResults.push([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
      .map(cohort => cohort.lectures
       .map(lecture => lecture.topics
        .filter(topic => topic.name.toUpperCase().includes(term)))))))));
  }


  console.log("searchResults after Topics Search: ", searchResults);
  console.log("\n\n");


  if([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
    .map(cohort => cohort.lectures
     .map(lecture => lecture.topics
      .map(topic => topic.quizzes
        .filter(quiz => quiz.name.toUpperCase().includes(term))))))))).length > 0){
    searchResults.push([].concat([], ...[].concat([], ...[].concat([], ...[].concat([], ...arr
      .map(cohort => cohort.lectures
       .map(lecture => lecture.topics
         .map(topic => topic.quizzes
           .filter(quiz => quiz.name.toUpperCase().includes(term))))))))));
  }


  console.log("searchResults after quiz check: ", searchResults);
  console.log("\n\n");


  searchResults.forEach((el, i) => {
    if(el !== [] || undefined){
      finalResult.push([].concat([], ...el));
    }
  });


  return [].concat([], ...finalResult);
};


module.exports = {
  searchReduxForDashNavSearch
}





//sample Object for Testing
// searchReduxForDashNavSearch([
//  {
//   'id': 1,
//   'lectures': [
//       {
//         'id': 2,
//         'name': 'Boking',
//         'topics': [
//             {
//               'id': 3,
//               'name': 'thing',
//               'quizzes': [
//                   {
//                     'id': 2,
//                     'name': 'food',
//                     'topic_id': 3
//                   },
//                   {
//                     'id': 3,
//                     'name': 'jamo',
//                     'topic_id': 3
//                   }
//                 ],
//               'lecture_id': 2
//             },
//             {
//               'id': 4,
//               'name': 'beer',
//               'quizzes': [
//                   {
//                     'id': 4,
//                     'name': 'bars',
//                     'topic_id': 4
//                   },
//                   {
//                     'id': 5,
//                     'name': 'alcohol',
//                     'topic_id': 4
//                   }
//                 ],
//               'lecture_id': 2
//             }
//           ],
//         'cohort_id': 1
//       }
//     ],
//   'subject': 'ENGLISH',
//   'time': '10PM',
//   'teacher_id': 1
// }
// ], 'o');
