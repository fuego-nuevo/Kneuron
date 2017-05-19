const Sequelize = require("sequelize");
const db = require('../config/database');

const School = db.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
const Teacher = db.define('teacher', {
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
const Student = db.define('student', {
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
const StudentQuestion = db.define('studentquestion', {
  question: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
const Class = db.define('class', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
const Lecture = db.define('lecture', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  attendance: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
  }
});
const Topic = db.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
const Quiz = db.define('quiz', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
const Question = db.define('question', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correct: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});
const Answer = db.define('answer', {
  choices: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
  selected: {
    type: Sequelize.INTEGER,  
    allowNull: false,
  }
});

Teacher.belongsTo(School);
School.hasMany(Teacher);
// Student.belongsTo(School);
// School.hasMany(Student);

// Class.belongsTo(Teacher);
// Teacher.hasMany(Class);

// Student.hasMany(Answer);
// Answer.belongsTo(Student);
// StudentQuestion.belongsTo(Student);
// Student.hasMany(StudentQuestion);

// StudentQuestion.hasOne(Topic);

// Class.hasMany(Lecture);
// Lecture.belongsTo(Class);

// Lecture.hasMany(Topic);
// Topic.belongsTo(Lecture);

// Topic.hasMany(Quiz);
// Quiz.belongsTo(Topic);
// Topic.hasMany(StudentQuestion);
// StudentQuestion.belongsTo(Topic);

// Quiz.hasMany(Question);
// Question.belongsTo(Quiz);

// Question.hasMany(Answer);
// Answer.belongsTo(Question);

// Student.belongsToMany(Lecture, { through: 'Student_Attendance'});
// Lecture.belongsToMany(Student, { through: 'Student_Attendance'});

// Student.belongsToMany(Class, { through: 'Student_Class'});
// Class.belongsToMany(Student, { through: 'Student_Class'});

module.exports = {
  School,
  Teacher, 
  Student,
  StudentQuestion,
  Class,
  Lecture,
  Topic,
  Quiz,
  Question,
  Answer
};

