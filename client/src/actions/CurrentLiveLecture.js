exports.currentLiveLecture = lecture => ({
  type: 'LIVE_LECTURE',
  lectureId: lecture.id,
  name: lecture.name,
  topics: lecture.topics,
});
