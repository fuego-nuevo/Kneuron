import React, { Component } from 'react';
import SearchedDataQuiz from './SearchedDataQuiz';

const SearchedDataQuizzes = props => (
  <div>
    {this.props.quizzes.map(quiz => (
      <SearchedDataQuiz quiz={quiz} />
    ))}
  </div>
)



export default SearchedDataQuizzes;
