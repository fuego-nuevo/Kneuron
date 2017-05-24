exports.currentLecture = (lecture) => {
  return {
    type: 'CURRENT_LECTURE',
    lectureId: lecture.id,
    name: lecture.name,
    topics: lecture.topics,
  };
}

exports.allLectures = (cohort) => {
  console.log('we in lectures.js action ', cohort)
  console.log('we in lectures.js action ', cohort.lectures)
  return {
    type: 'ALL_LECTURES',
    lectures: cohort.lectures,
  };
}