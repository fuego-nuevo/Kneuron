const router = require('express').Router();

router.use('/schools', require('./school'));
router.use('/teachers', require('./teacher'));
router.use('/admins', require('./admin'));
router.use('/students', require('./student'));
router.use('/studentQuestions', require('./studentQuestion'));
router.use('/studentAttendance', require('./studentAttendance'));
router.use('/studentCohorts', require('./studentCohort'));
router.use('/cohorts', require('./cohort'));
router.use('/lectures', require('./lecture'));
router.use('/topics', require('./topic'));
router.use('/quizzes', require('./quiz'));
router.use('/questions', require('./question'));
router.use('/answers', require('./answer'));
router.use('/results', require('./result'));
router.use('/camera', require('./camera'));
router.use('/facialVerify', require('./facialVerify'));
router.use('/performances', require('./performance'));

module.exports = router;
