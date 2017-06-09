const SearchResults = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_REDUX_DATA':
      return {
        searchedResults: action.searchedResults,
      };
    default:
      return state;
  }
};

export default SearchResults;
