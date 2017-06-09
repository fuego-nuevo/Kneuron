import React, { Component } from 'react';

import SearchedDataQuiz from './SearchedDataQuiz';

const SearchedDataQuizzes = props => (
  <div>
    {props.quizzes.map(quiz => (
      <SearchedDataQuiz quiz={quiz} history={props.history} fetchTeacherInfo={props.fetchTeacherInfo} />
    ))}
  </div>
);

export default SearchedDataQuizzes;
