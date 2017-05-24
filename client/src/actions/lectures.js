exports.currentLecture = (lecture) => {
  return {
    type: 'CURRENT_LECTURE',
    lectureId: lecture.data.id,
    name: lecture.data.name,
    topics: lecture.data.topics,
  };
}

exports.allLectures = (cohort) => {
  return {
    type: 'ALL_LECTURES',
    lectures: cohort.data.lectures,
  };
}