exports.lectureLive = () => ({
  type: 'LECTURE_LIVE',
  liveLecture: true,
});

exports.lectureOff = () => ({
  type: 'LECTURE_OFF',
  liveLecture: false,
});
