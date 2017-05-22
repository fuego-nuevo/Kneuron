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
});

const Lecture = db.define('lecture', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // attendance: {
  //   type: Sequelize.ARRAY(Sequelize.JSON),
  //   allowNull: false,
  // }
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

  User.hasMany(Attendance, { as: 'students_attendance', foreignKey: { name: 'student_id', allowNull: false }, onDelete: 'CASCADE' });
  Attendance.belongsTo(User);

  User.hasMany(Cohort, { foreignKey: { name: 'teacher_id', allowNull: false }, onDelete: 'CASCADE' });
  User.hasMany(Cohort, { foreignKey: { name: 'student_id', allowNull: true }, onDelete: 'CASCADE' });

  // User.hasMany(Cohort, { as: 'teachers_classes' } );
  // User.hasMany(Cohort, { as: 'students_classes' } );

  Cohort.belongsTo(User);

  User.hasMany(StudentQuestion);
  StudentQuestion.belongsTo(User);

  Cohort.hasMany(Lecture, { as: 'cohort_lectures' });
  Lecture.belongsTo(Cohort);

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
