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

School.hasMany(Teacher);
School.hasMany(Student);
Teacher.belongsTo(School);
Student.belongsTo(School);

Teacher.hasMany(Student, { through: 'TeacherStudent' });
Teacher.hasMany(Class);
Class.belongsTo(Teacher);

Student.hasMany(Teacher, { through: 'TeacherStudent' });
Student.hasMany(Class);
Student.hasMany(Answer);
Student.hasMany(StudentQuestion);
Answer.belongsTo(Student);
StudentQuestion.belongsTo(Student);

StudentQuestion.hasOne(Topic);

Class.hasMany(Lecture);
Lecture.belongsTo(Class);

Lecture.hasMany(Topic);
Topic.belongsTo(Lecture);

Topic.hasMany(Quiz);
Topic.hasMany(StudentQuestion);
Quiz.belongsTo(Topic);

Quiz.hasMany(Question);
Question.belongsTo(Quiz);

Question.hasMany(Answer);
Answer.belongsTo(Question);

