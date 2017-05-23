// const router = require('express').Router();
// const User = require('../db/models').User;
// const Cohort = require('../db/models').Cohort;
// const Lecture = require('../db/models').Lecture;
// const antiHasher = require('./util').antiHasher;
//
// // Post A Lecture For A Given Cohort From A Given Teacher without Async
// // router.post('/', (req, res) => {
// //   User.findOne({ where: { email: antiHasher(req.body.auth_token) } })
// //     .then((teacher) => {
// //       Cohort.findOne({ where: { teacherId: teacher.id, id: req.body.id, subject: req.body.subject } })
// //         .then((cohort) => {
// //           Lecture.findOne({ where: { cohortId: cohort.id, name: req.body.name } })
// //             .then((lecture) => {
// //               if (lecture) {
// //                 console.log(`${lecture.name} Lecture for ${cohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
// //                 res.status(422).send(`${lecture.name} Lecture for ${cohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
// //               } else {
// //                 Lecture.create({
// //                   name: req.body.name,
// //                   cohortId: req.body.id,
// //                 })
// //                 .then((lecture) => {
// //                   console.log('Lecture Posted To DB: ', lecture);
// //                   res.status(201).send(lecture);
// //                 })
// //                 .catch((error) => {
// //                   console.log('Error Posting To DB: ', error);
// //                   res.status(404).send();
// //                 });
// //               }
// //             });
// //         })
// //         .catch((error) => {
// //           console.log(`${teacher.fName} ${teacher.lName} Does Not Currently Have A ${cohort.subject} Cohort.`);
// //           res.status(404).send(error);
// //         });
// //     })
// //     .catch((error) => {
// //       console.log(`Error finding Teacher with email: ${antiHasher(req.body.auth_token)}`);
// //       res.status(404).send(error);
// //     });
// // });
//
//
//
// //Post A Lecture For A Cohort With Async
// router.post('/', async((req, res, next) => {
//   try{
//     const teacher = await(User.findOne({ where: { email: antiHasher(req.body.auth_token) }}));
//     if(teacher){
//       const teacherCohort = await(Cohort.findOne({ where: { teacherId: teacher.id, id: req.body.id, subject: req.body.subject }}));
//       if(teacherCohort){
//         const teacherLecture = await(Lecture.findOne({ where: { cohortId: teacherCohort.id, name: req.body.name }}));
//         if(teacherLecture){
//           console.log(`${teacherLecture.name} Lecture for ${teacherCohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
//           res.status(422).send(`${teacherLecture.name} Lecture for ${teacherCohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
//         } else {
//           const newLecture = await(Lecture.create({ name: req.body.name, cohortId: req.body.id}));
//           console.log("Lecture Posted To DB: ", newLecture);
//           res.status(201).send(newLecture);
//         }
//       } else {
//         console.log(`${teacher.fName} ${teacher.lName} Does Not Currently Have A ${req.body.subject} Cohort.`);
//         res.status(404).send();
//       }
//     } else {
//       console.log(`Error finding Teacher with email: ${antiHasher(req.body.auth_token)}`);
//       res.status(404).send();
//     }
//   } catch(e) {
//     res.status(404).send();
//   }
// }));
//
//
// // Get All Lectures For A Given Cohort From A Given Teacher without async
// // router.get('/:cohort_id/:auth_token/:subject', (req, res) => {
// //   // Find A Teacher With Their token_id From The Body
// //   User.findOne({ where: { email: antiHasher(req.params.auth_token) } })
// //     .then((teacher) => {
// //       // Find All Of Said Teacher's Cohort
// //       Cohort.findOne({ where: { id: req.params.cohort_id, subject: req.params.subject, teacherId: teacher.id } })
// //         .then((cohort) => {
// //           // Find All Lectures With Cohort ID's
// //           Lecture.findAll({ where: { cohortId: cohort.id } })
// //             .then((lectures) => {
// //               // Return Lectures
// //               res.status(200).send(lectures);
// //             })
// //             .catch((error) => {
// //               console.log(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} Cohort Does Not Have Any Lectures...}`);
// //               res.status(404).send(error);
// //             });
// //         });
// //     })
// //     .catch((error) => {
// //       console.log('Could not Find Teacher...');
// //       res.status(404).send(`Couldn't Find Teacher: ${error}`);
// //     });
// // });
//
//
// // Get All Lectures For A Given Cohort From A Given Teacher With Async
// router.get('/:cohort_id/:auth_token/:subject', async((req, res) => {
//   try{
//     const teacher = await(User.findOne({ where: { email: antiHasher(req.params.auth_token) } }));
//     if(teacher){
//       const teachersCohort = await(Cohort.findOne({ where: { id: req.params.cohort_id, subject: req.params.subject, teacherId: teacher.id } }));
//       if(teachersCohort){
//         const lectures = await(Lecture.findAll({ where: { cohortId: cohort.id } }));
//         if(lectures){
//           res.status(200).send(lectures);
//         }
//       } else {
//         console.log(`${teacher.fName} ${teacher.lName}'s ${teachersCohort.subject} Cohort Does Not Have Any Lectures...}`);
//         res.status(404).send(error);
//       }
//     } else {
//       console.log('Could not Find Teacher...');
//       res.status(404).send(`Couldn't Find Teacher: ${error}`);
//     }
//   } catch(e) {
//     console.log("Async Or Network Error: ", e);
//     res.status(404).send();
//   }
// }));
//
//
//
// // Update A Lecture For A Given Cohort From A Given Teacher without Async
// // router.put('/', (req, res) => {
// //   User.findOne({ where: { email: antiHasher(req.body.auth_token) } })
// //     .then((teacher) => {
// //       Cohort.findOne({ where: { id: req.body.cohortId, subject: req.body.subject, teacherId: teacher.id } })
// //         .then((cohort) => {
// //           Lecture.findOne({ where: {name: req.body.lecture_name, cohortId: cohort.id } })
// //             .then((lecture) => {
// //               lecture.subject = req.body.subject;
// //               Lecture.update({
// //                 subject: lecture.subject,
// //               }, {
// //                 where: { id: lecture.id },
// //               })
// //               .then((result) => {
// //                 res.status(200).send(result);
// //               })
// //               .catch(error => {
// //                 console.log(`Error Updating ${lecture.name} Lecture For ${cohort.subject} Cohort`);
// //                 res.status(404).send();
// //               })
// //             })
// //             .catch(err => {
// //               console.log(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err);
// //               res.status(404).send(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err)
// //             })
// //             .catch((err) => {
// //               console.log(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err);
// //               res.status(404).send(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err);
// //             });
// //         })
// //         .catch(error => {
// //           console.log(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error: `, err);
// //           res.status(404).send(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error: `, err)
// //         })
// //     })
// //     .catch(error => {
// //       console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
// //       res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
// //     })
// // });
//
//
// // Update A Lecture For A Given Cohort From A Given Teacher With Async
// router.put('/', async((req, res) => {
//   try{
//     const teacher = await(User.findOne({ where: { email: antiHasher(req.body.auth_token) } }));
//     if(teacher){
//       const teachersCohort = await(Cohort.findOne({ where: { id: req.body.cohortId, subject: req.body.subject, teacherId: teacher.id } }));
//       if(teachersCohort){
//         const lecture = await(Lecture.findOne({ where: {name: req.body.lecture_name, cohortId: teachersCohort.id } }));
//         if(lecture){
//           lecture.subject = req.body.subject;
//           const updatedLecture = await(Lecture.update({subject: lecture.subject}, {where: { id: lecture.id }}));
//           if(updatedLecture){
//             res.status(200).send(updatedLecture);
//           } else {
//             console.log(`Error Updating ${lecture.name} Lecture For ${teachersCohort.subject} Cohort`);
//             res.status(404).send();
//           }
//         } else {
//           console.log(`${teacher.fName} ${teacher.lName}'s ${teachersCohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err);
//           res.status(404).send(`${teacher.fName} ${teacher.lName}'s ${teachersCohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err)
//         }
//       } else {
//         console.log(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error: `, err);
//         res.status(404).send(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error: `, err)
//       }
//     } else {
//       console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
//       res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
//     }
//   } catch(e) {
//     console.log("Async Or Network Error: ", e);
//     res.status(404).send();
//   }
// }));
//
//
// // Delete A Lecture For A Given Cohort From A Given Teacher without Async
// // router.delete('/', (req, res) => {
// //   Lecture.findOne({ where: { cohortId: req.body.cohortId } })
// //     .then((lecture) => {
// //       res.status(202).send(`${lecture} was marked for deletion...`);
// //       lecture.destroy({ force: true });
// //       res.status(204).send(`${lecture} was destroyed from DB`);
// //     })
// //     .catch((error) => {
// //       console.log('Error Deleting Selected Lecture: ', error);
// //       res.status(404).send('Error Deleting Selected Lecture...');
// //     });
// // });
//
// // Delete A Lecture For A Given Cohort From A Given Teacher With Async
// router.delete('/', async((req, res) => {
//   try{
//     const lecture = await(Lecture.findOne({ where: { cohortId: req.body.cohortId } }));
//     res.status(202).send(`${lecture} was marked for deletion...`);
//     lecture.destroy({ force: true });
//     res.status(204).send(`${lecture} was destroyed from DB`);
//   } catch(e) {
//     console.log('Error Deleting Selected Lecture: ', e);
//     res.status(404).send('Error Deleting Selected Lecture...');
//   }
// }));
//
//
// module.exports = router;
