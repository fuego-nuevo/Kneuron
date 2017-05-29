const SearchResults = (state = {}, action) => {
  switch(action.type){
    case 'SEARCH_REDUX_DATA':
      return {
        searchedResults: action.searchedResults,
        // cohorts: action.cohorts,
        // lectures: action.lectures,
        // searchTopics: action.searchTopics,
        // quizzes: action.quizzes
      }

    default:
      return state
  }
}


export default SearchResults;
