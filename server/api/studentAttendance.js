const router = require('express').Router();
const db = require('../db/models');

const postAttendance = async (req, res) => {
  try {
    console.log('this is the req.body in postAttendance ', req.body);
    const attendance = await db.Attendance.findOne({ where: { student_id: req.body.student_id, lecture_id: req.body.lecture_id } });
    if (attendance) {
      console.log('You have already been marked for attendance boi!');
      res.status(404).send('You have already been marked for attendance boi!');
    } else {
      const markedAttendance = await db.User.create({
        present: req.body.present,
        student_id: req.body.student_id,
        lecture_id: req.body.lecture_id,
      });
      if (markedAttendance) {
        console.log('Signed Up New User: ', { attendance: markedAttendance });
        res.status(201).send({ attendance: markedAttendance });
      } else {
        console.log('Invalid Data In Req.Body: ', markedAttendance);
      }
    }
  } catch (error) {
    console.log('attendance was not marked correctly');
    res.status(404).send(error);
  }
};

router.post('/', postAttendance);


module.exports = router;
