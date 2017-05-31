exports.allLectures = cohort => ({
  type: 'ALL_LECTURES',
  lectures: cohort.lectures,
  currentCohortId: cohort.id,
});
