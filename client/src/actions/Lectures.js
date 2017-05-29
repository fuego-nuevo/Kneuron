exports.allLectures = (cohort) => {
  return {
    type: 'ALL_LECTURES',
    lectures: cohort.lectures,
    currentCohortId: cohort.id,
  };
};
