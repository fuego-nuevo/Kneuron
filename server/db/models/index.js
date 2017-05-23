const Sequelize = require('sequelize');
const db = require('../config/database');

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
  teacher_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // student_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: true,
  // },
});

const Lecture = db.define('lecture', {
  name: {
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
  correct: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Answer = db.define('answer', {
  choices: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
  selected: {
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


const defineRelationship = () => {
  School.hasMany(User);
  User.belongsTo(School);
  // Optional
  // User.hasMany(School);
  // School.belongsTo(User);
  // Optional

  // User.belongsToMany(Cohort, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  // Cohort.belongsToMany(User, { foreignKey: { name: 'cohort_id', allowNull: false }, onDelete: 'CASCADE' });

  User.hasMany(Cohort, { foreignKey: { name: 'teacher_id', allowNull: false }, onDelete: 'CASCADE' });
  Cohort.belongsTo(User, { as: 'teacher', foreignKey: { name: 'teacher_id', allowNull: false }, onDelete: 'CASCADE' });

  // User.hasMany(Cohort, { foreignKey: { name: 'student_id', allowNull: true }, onDelete: 'CASCADE' });
  // Cohort.belongsTo(User, { as: 'student', foreignKey: { name: 'student_id', allowNull: true }, onDelete: 'CASCADE' });

  User.belongsToMany(Cohort, { as: 'student_cohort', through: 'StudentCohort' });
  Cohort.belongsToMany(User, { as: 'cohort_student', through: 'StudentCohort' });

  Cohort.hasMany(Lecture);
  Lecture.belongsTo(Cohort);

  User.hasMany(Attendance, { as: 'students_attendance', foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });

  Attendance.belongsTo(User);


  User.hasMany(StudentQuestion);
  StudentQuestion.belongsTo(User);


  Lecture.hasMany(Attendance, { as: 'lecture_attendance' });
  Attendance.belongsTo(Lecture);

  // Lecture.belongsToMany(User, { through: 'Attendance', as: 'lecture', foreignKey: 'lecture_id' });
  // User.belongsToMany(Lecture, { through: 'Attendance', as: 'student', foreignKey: 'student_id'});

  // Lecture.hasMany(User)
  // User.belongsTo(Lecture)

  Lecture.hasMany(Topic);
  Topic.belongsTo(Lecture);

  Topic.hasMany(Quiz);
  Quiz.belongsTo(Topic);

  Topic.hasMany(StudentQuestion);
  StudentQuestion.belongsTo(Topic);

  Quiz.hasMany(Question);
  Question.belongsTo(Quiz);

  Question.hasMany(Answer);
  Answer.belongsTo(Question);
};



module.exports = {
  School,
  User,
  StudentQuestion,
  Cohort,
  Lecture,
  Topic,
  Quiz,
  Question,
  Answer,
  Attendance,
  defineRelationship,
};
