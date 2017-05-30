const Sequelize = require('sequelize');
const db = require('../config/database');

// Table Definitions
const School = db.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
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
  },
  image: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
});

const StudentQuestion = db.define('studentquestion', {
  question: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Cohort = db.define('cohort', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  semester: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Lecture = db.define('lecture', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Topic = db.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Quiz = db.define('quiz', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Question = db.define('question', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  choices: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    limit: 4,
  },
  correct: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});


const Attendance = db.define('attendance', {
  present: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

// Join Tables
// Students and Cohorts
const StudentCohort = db.define('studentcohort', {});

const Answer = db.define('answer', {
  isCorrect: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  selected: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Result = db.define('result', {
  percentage: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

// Relation Definitions
// THESE FUCKING WORK!!!!
School.hasMany(User, { foreignKey: { name: 'school_id', allowNull: true }, onDelete: 'CASCADE' });
User.belongsTo(School, { foreignKey: { name: 'school_id', allowNull: true }, onDelete: 'CASCADE' });

User.hasMany(Cohort, { as: 'cohort', foreignKey: { name: 'teacher_id', allowNull: false }, onDelete: 'CASCADE' });
Cohort.belongsTo(User, { as: 'teacher', foreignKey: { name: 'teacher_id', allowNull: false }, onDelete: 'CASCADE' });

// User.belongsToMany(Cohort, { as: 'student_cohort', through: 'StudentCohort', foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
// Cohort.belongsToMany(User, { as: 'cohort_student', through: 'StudentCohort', foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });

Cohort.hasMany(Lecture, { foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });
Lecture.belongsTo(Cohort, { foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Attendance, { as: 'students_attendance', foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
Attendance.belongsTo(User);

User.hasMany(StudentQuestion, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
StudentQuestion.belongsTo(User, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });

Lecture.hasMany(Attendance, { as: 'lecture_attendance' });
Attendance.belongsTo(Lecture);

Lecture.hasMany(Topic, { foreignKey: { name: 'lecture_id', allowNull: false }, onDelete: 'CASCADE' });
Topic.belongsTo(Lecture, { foreignKey: { name: 'lecture_id', allowNull: false }, onDelete: 'CASCADE' });

Topic.hasMany(Quiz, { foreignKey: { name: 'topic_id', allowNull: false }, onDelete: 'CASCADE' });
Quiz.belongsTo(Topic, { foreignKey: { name: 'topic_id', allowNull: false }, onDelete: 'CASCADE' });

Topic.hasMany(StudentQuestion, { foreignKey: { name: 'topic_id', allowNull: false }, onDelete: 'CASCADE' });
StudentQuestion.belongsTo(Topic, { foreignKey: { name: 'topic_id', allowNull: false }, onDelete: 'CASCADE' });

Quiz.hasMany(Question, { foreignKey: { name: 'quiz_id', allowNull: false }, onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: { name: 'quiz_id', allowNull: false }, onDelete: 'CASCADE' });

Question.hasMany(Answer, { foreignKey: { name: 'question_id', allowNull: false }, onDelete: 'CASCADE' });
Answer.belongsTo(Question, { foreignKey: { name: 'question_id', allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Answer, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
Answer.belongsTo(User, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(StudentCohort, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
StudentCohort.belongsTo(User, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
Cohort.hasMany(StudentCohort, { foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });
StudentCohort.belongsTo(Cohort, { foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Result, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
Result.belongsTo(User, { foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
Quiz.hasMany(Result, { foreignKey: { name: 'quiz_id', allowNull: false }, onDelete: 'CASCADE' });
Result.belongsTo(Quiz, { foreignKey: { name: 'quiz_id', allowNull: false }, onDelete: 'CASCADE' });

Cohort.hasMany(Result, { foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });
Result.belongsTo(Cohort, { foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });

module.exports = {
  School,
  User,
  StudentQuestion,
  Cohort,
  StudentCohort,
  Lecture,
  Topic,
  Quiz,
  Question,
  Answer,
  Attendance,
  Result,
};
