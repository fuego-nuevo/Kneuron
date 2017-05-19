const Sequelize = require("sequelize");
const db = require('../config/database');

const School = db.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

const User = db.define('user', {
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userType: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

// const Teacher = db.define('teacher', {
//   fName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   lName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   }
// }, { underscored: true });

// const Student = db.define('student', {
//   fName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   lName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   }
// }, { underscored: true });

const StudentQuestion = db.define('studentquestion', {
  question: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

const Class = db.define('class', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

const Lecture = db.define('lecture', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // attendance: {
  //   type: Sequelize.ARRAY(Sequelize.JSON),
  //   allowNull: false,
  // }
}, { underscored: true });

const Topic = db.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

const Quiz = db.define('quiz', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

const Question = db.define('question', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correct: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, { underscored: true });

const Answer = db.define('answer', {
  choices: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
  selected: {
    type: Sequelize.INTEGER,  
    allowNull: false,
  }
}, { underscored: true });


const StudentAnswer = db.define('studentanswer', {
  selected: {
    type: Sequelize.INTEGER,  
    allowNull: false,
  }
}, { underscored: true });

// const Class = db.define('class', {
//   subject: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   }
// }, { underscored: true });

/**
 * JOIN
 */

const Attendance = db.define('attendance', {
  present: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
}, { underscored: true });

// const Class = db.define('class', {
//   subject: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   }
// }, { underscored: true });
/**
 * JOIN
 */

// 4th Iteration w Suggestions //

School.hasMany(User);
User.belongsTo(School);
// Optional
// User.hasMany(School);
// School.belongsTo(User);
// Optional

User.hasMany(Attendance, { as: 'students_attendance', foreignKey: 'student_id'})
Attendance.belongsTo(User);

User.hasMany(Class, { as: 'teachers_classes', foreignKey: 'teacher_id'});
User.hasMany(Class, { as: 'students_classes', foreignKey: 'student_id' });
Class.belongsTo(User);

Class.hasMany(Lecture, { as: 'class_lectures', foreignKey: 'class_id'});
Lecture.belongsTo(Class);

// Lecture.hasMany(Attendance, { as: 'lecture_attendance', foreignKey: 'lecture_id'});
// Attendance.belongsTo(Lecture);

Lecture.belongsToMany(User, { through: 'Attendance', as: 'lecture', foreignKey: 'lecture_id' });
User.belongsToMany(Lecture, { through: 'Attendance', as: 'student', foreignKey: 'student_id'});

Lecture.hasMany(Topic, { foreignKey: 'topic_id'});
Topic.belongsTo(Lecture);

User.hasMany(StudentQuestion, { foreignKey: 'student_id'});
StudentQuestion.belongsTo(User);

Topic.hasMany(StudentQuestion, { foreignKey: 'student_question_id' });
StudentQuestion.belongsTo(Topic);

Topic.hasMany(Quiz, { foreignKey: 'topic_id' });
Quiz.belongsTo(Topic);

Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.belongsTo(Quiz);

Question.hasMany(Answer, { foreignKey: 'quiz_id' });
Answer.belongsTo(Question);

// User.hasMany(StudentAnswer, { as: 'quiz_question_selected_student_answer', foreignKey: 'student_id'});
// StudentAnswer.belongsTo(User, { as: 'student_quiz_answer'});

// Question.hasMany(StudentAnswer, {as: 'quiz_question_number', foreignKey: 'quiz_question_id'});
// StudentAnswer.belongsTo(Question);

// Answer.hasMany(StudentAnswer, { as: 'quiz_quesiton_selected_answer', foreignKey: 'answer_id'});
// StudentAnswer.belongsTo(Answer, {as: 'student_answer'});

// User.belongsToMany(Answer, {through: 'StudentAnswer', foreignKey: 'student_id'});
// Answer.belongsToMany(User, {through: 'StudentAnswer', foreignKey: 'answer_id'})

//student && attendance
//Lecture has many students through attendance
//Student has many lectures through attendance


// User.belongsToMany(model.user)


// 4th Iteration w Suggestions //

// 3rd Mafckin Iteration//

// School.belongsToMany(Teacher, { through: 'Class', foreignKey: 'schoolId', onDelete: 'CASCADE' });
// Teacher.belongsToMany(School, { through: 'Class', foreignKey: 'teacherId', onDelete: 'CASCADE' });

// Teacher.hasMany(Student);
// Student.belongsTo(Teacher);

// Student.hasMany(Teacher);
// Teacher.belongsTo(Student);

// Class.hasMany(Lecture);
// Lecture.belongsTo(Class);

// Lecture.hasMany(Topic);
// Topic.belongsTo(Lecture);

// Topic.hasMany(Quiz);
// Quiz.belongsTo(Topic);

// Student.belongsToMany( Topic, { through: 'StudentQuestion', foreignKey: 'studentId', onDelete: 'CASCADE' });
// Topic.belongsToMany( Student, { through: 'StudentQuestion', foreignKey: 'topicId', onDelete: 'CASCADE' });

// Quiz.hasMany(Question);
// Question.belongsTo(Quiz);

// Question.hasMany(Answer);
// Answer.belongsTo(Question);

// 3rd Mafckin Iteration//


// 2nd Iteration //

// School.hasMany(Teacher);
// School.hasMany(Student);
// Teacher.belongsTo(School);
// Student.belongsTo(School);

// School.belongsToMany(Class, { through: "Class", foreignKey: "schoolId" });
// Class.belongsTo(School);
// Teacher.belongsToMany(Class, { through: "Class", foreignKey: "teacherId" });
// Class.belongsTo(Teacher);

// Class.belongsTo(Teacher);
// Teacher.hasMany(Class);

// Student.belongsToMany(Class, { as: "Students_Class", through: "Class_Student", foreignKey: "Class_rowId"});
// Class.belongsToMany(Student, { as: "Classes_Students", through: "Class_Student", foreignKey: "Student_rowId"});
// ClassStudent.belongsTo(Student);
// ClassStudent.belongsTo(Class);

// Teacher.hasMany(Student);
// Student.belongsTo(Teacher);
// Student.hasMany(Teacher);
// Teacher.belongsTo(Student);

// Student.hasMany(Answer);
// Answer.belongsTo(Student);
// Student.hasMany(StudentQuestion);
// StudentQuestion.belongsTo(Student);

// Student.belongsToMany(Lecture, { as: "Students_Lecture", through: "Student_Attendance", foreignKey: "Lecture_rowId"});
// Lecture.belongsToMany(Student, { as: "Lectures_Student", through: "Student_Attendance", foreignKey: "Student_rowId"});
// StudentAttendance.belongsTo(Lecture);
// StudentAttendance.belongsTo(Student);

// Class.hasMany(Lecture);
// Lecture.belongsTo(Class);


// Topic.hasMany(Quiz);
// Quiz.belongsTo(Topic);

// Lecture.hasMany(Topic);
// Topic.belongsTo(Lecture);

// Question.hasMany(Answer);
// Answer.belongsTo(Question);


// Topic.hasMany(StudentQuestion);
// StudentQuestion.hasOne(Topic);

// Quiz.hasMany(Question);

// 2nd Iteration //

//******OG BROKE*****//
//*******************//

// School.hasMany(Teacher);
// School.hasMany(Student);
// Teacher.belongsTo(School);
// Student.belongsTo(School);

// Class.belongsTo(Teacher);
// Teacher.hasMany(Class);

// Answer.belongsTo(Student);
// Student.hasMany(Answer);
// StudentQuestion.belongsTo(Student);
// Student.hasMany(StudentQuestion);

// StudentQuestion.belongsTo(Topic);
// Topic.hasMany(StudentQuestion);

// Lecture.belongsTo(Class);
// Class.hasMany(Lecture);

// Topic.belongsTo(Lecture);
// Lecture.hasMany(Topic);

// Quiz.belongsTo(Topic);
// Topic.hasMany(Quiz);
// StudentQuestion.belongsTo(Topic);
// Topic.hasMany(StudentQuestion);

// Question.belongsTo(Quiz);
// Quiz.hasMany(Question);

// Answer.belongsTo(Question);
// Question.hasMany(Answer);

// Student.belongsToMany(Lecture, { through: 'Student_Attendance'});
// Lecture.belongsToMany(Student, { through: 'Student_Attendance'});

// Student.belongsToMany(Class, { through: 'Student_Class'});
// Class.belongsToMany(Student, { through: 'Student_Class'});

//*******************//
//******OG BROKE*****//

module.exports = {
  School,
  User,
  // Teacher, 
  // Student,
  StudentQuestion,
  Class,
  Lecture,
  Topic,
  Quiz,
  Question,
  Answer,
  // Attendance
};

