const Sequelize = require("sequelize");
const db = require("../config/database");

// var sequelize = new Sequelize("myconnectionstring",
//   {
//     sync: {
//       force: true
//     }
//   });

// sequelize.sync({ force: true });

const School = db.define("school", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {underscored: true});

const Teacher = db.define("teacher", {
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {underscored: true});

const Student = db.define("student", {
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {underscored: true});

const StudentQuestion = db.define("studentquestion", {
  question: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {underscored: true});

const Class = db.define("class", {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {underscored: true});

const Lecture = db.define("lecture", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  attendance: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
  }
}, {underscored: true});

const Topic = db.define("topic", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {underscored: true});

const Quiz = db.define("quiz", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {underscored: true});

const Question = db.define("question", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  correct: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {underscored: true});

const Answer = db.define("answer", {
  choices: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  },
  selected: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {underscored: true});


//joins
const ClassStudent = db.define("classstudent", {
  imInTheDb: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {underscored: true});

const StudentLecture = db.define("studentlecture", {
  present: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {underscored: true});


School.hasMany(Teacher);
School.hasMany(Student);
Teacher.belongsTo(School);
Student.belongsTo(School);

Class.belongsTo(Teacher);
Teacher.hasMany(Class);

Student.belongsToMany(Class, { as: "Students_Class", through: "Class_Student", foreignKey: "Class_rowId"});
Class.belongsToMany(Student, { as: "Classes_Students", through: "Class_Student", foreignKey: "Student_rowId"});
ClassStudent.belongsTo(Student);
ClassStudent.belongsTo(Class);

Student.hasMany(Answer);
Answer.belongsTo(Student);
Student.hasMany(StudentQuestion);
StudentQuestion.belongsTo(Student);

Student.belongsToMany(Lecture, { as: "Students_Lecture", through: "Student_Lecture", foreignKey: "Lecture_rowId"});
Lecture.belongsToMany(Student, { as: "Lectures_Student", through: "Student_Lecture", foreignKey: "Student_rowId"});
StudentLecture.belongsTo(Lecture);
StudentLecture.belongsTo(Student);

Class.hasMany(Lecture);
Lecture.belongsTo(Class);


Topic.hasMany(Quiz);
Quiz.belongsTo(Topic);

Lecture.hasMany(Topic);
Topic.belongsTo(Lecture);

Question.hasMany(Answer);
Answer.belongsTo(Question);


Topic.hasMany(StudentQuestion);
StudentQuestion.hasOne(Topic);


Quiz.hasMany(Question);
Question.belongsTo(Quiz);


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
  Answer,
  ClassStudent
};

