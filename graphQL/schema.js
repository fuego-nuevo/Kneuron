import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
  GraphQLInterfaceType
} from 'graphql/type';

/**
 * generate projection object for PostgreSQL
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}


//COULD BE ANYTHING ELSE e.g. CLASSES/TEACHERS/etc...
//think of this as the table or an individual schema
var School = new GraphQLObjectType({
  name: 'School',
  description: 'School',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The School.',
    },
    name: {
      type: GraphQLString,
      description: 'The Name Of The School.',
    }
  })
});


//Teachers
var Teacher = new GraphQLObjectType({
  name: 'Teacher',
  description: 'Teacher',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Teacher.',
    },
    firstName: {
      type: GraphQLString,
      description: 'The First Name Of The Teacher.',
    },
    lastName: {
      type: GraphQLString,
      description: 'The Last Name Of The Teacher.'
    }
    School: SchoolType,
    Student: StudentType,

  })
});


//Students
var Student = new GraphQLObjectType({
  name: 'Student',
  description: 'Student',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Student.',
    },
    firstName: {
      type: GraphQLString,
      description: 'The First Name Of The Student.',
    },
    lastName: {
      type: GraphQLString,
      description: 'The Last Name Of The Student.'
    }
    School: SchoolType,
    Teacher: TeacherType,
    Class: ClassType
  })
});


//Classes Might need to change klass to Class with C being capitalized
//might need to capitalize rest of GQL object types too
var Class = new GraphQLObjectType({
  name: 'Class',
  description: 'Class',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Class.',
    },
    subject: {
      type: GraphQLString,
      description: 'The Subject Of The Class.',
    },
    Student: StudentType,
    Teacher: TeacherType
  })
});


//Lectures
var Lecture = new GraphQLObjectType({
  name: 'Lecture',
  description: 'Lecture',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Lecture.',
    },
    name: {
      type: GraphQLString,
      description: 'The Name Of The Lecture.',
    },
    Class: ClassType
  })
});


//Topics
var Topic = new GraphQLObjectType({
  name: 'Topic',
  description: 'Topic',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Topic.',
    },
    name: {
      type: GraphQLString,
      description: 'The Name Of The Topic.',
    },
    Lecture: LectureType
  })
});


//Quizzes
var Quiz = new GraphQLObjectType({
  name: 'Quiz',
  description: 'Quiz',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Quiz.',
    },
    name: {
      type: GraphQLString,
      description: 'The Name Of The Quiz.',
    },
    Quiz: TopicType
  })
});


//Questions
var Question = new GraphQLObjectType({
  name: 'Question',
  description: 'Question',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Question.',
    },
    content: {
      type: GraphQLString,
      description: 'The content of the Question.',
    },
    Quiz: QuizType
  })
});

//Answers
var Answer = new GraphQLObjectType({
  name: 'Answer',
  description: 'Answer',
  fields: () => ({
    id: {
      type: (GraphQLInt),
      description: 'The ID Of The Answer.',
    },
    correct: {
      type: GraphQLBoolean,
      description: 'Answer Correct True or False.',
    },
    choices: {
      type: new GraphQLList(choicesType),
      description: 'Array of Answers'
    },
    select: {
      type: GraphQLBoolean,
      description: 'Selected Answer From A Given User.'
    }
    Question: QuestionType,
    Student: StudentType
  })
});

//Think of this as the overall schema with multiple tables
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      School: {
        type: new GraphQLList(School),
        args: {
          id: {
            name: 'SchoolId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allSchools = new Promise((resolve, reject) => {
              School.find({id}, projections,(err, Schools) => {
                  err ? reject(err) : resolve(Schools)
              })
          })
          return allSchools
        }
      },
      Teacher: {
        type: new GraphQLList(Teacher),
        args: {
          id: {
            name: 'SchoolId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allTeachers = new Promise((resolve, reject) => {
              Teacher.find({id}, projections,(err, Teachers) => {
                  err ? reject(err) : resolve(Teachers)
              })
          })
          return allTeachers
        }
      },
      Student: {
        type: new GraphQLList(Student),
        args: {
          id: {
            name: 'StudentId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allStudents = new Promise((resolve, reject) => {
              Student.find({id}, projections,(err, Students) => {
                  err ? reject(err) : resolve(Students)
              })
          })
          return allStudents
        }
      },
      Class: {
        type: new GraphQLList(Class),
        args: {
          id: {
            name: 'ClassId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allClasses = new Promise((resolve, reject) => {
              Class.find({id}, projections,(err, Classes) => {
                  err ? reject(err) : resolve(Classes)
              })
          })
          return allClasses
        }
      },
      Lecture: {
        type: new GraphQLList(Lecture),
        args: {
          id: {
            name: 'LectureId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allLectures = new Promise((resolve, reject) => {
              Lecture.find({id}, projections,(err, Lectures) => {
                  err ? reject(err) : resolve(Lectures)
              })
          })
          return allLectures
        }
      },
      Topic: {
        type: new GraphQLList(Topic),
        args: {
          id: {
            name: 'TopicId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allTopics = new Promise((resolve, reject) => {
              Topic.find({id}, projections,(err, Topics) => {
                  err ? reject(err) : resolve(Topics)
              })
          })
          return allTopics
        }
      },
      Quiz: {
        type: new GraphQLList(Quiz),
        args: {
          id: {
            name: 'QuizId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allQuizzes = new Promise((resolve, reject) => {
              Quiz.find({id}, projections,(err, Quizzes) => {
                  err ? reject(err) : resolve(Quizzes)
              })
          })
          return allQuizzes
        }
      },
      Question: {
        type: new GraphQLList(Question),
        args: {
          id: {
            name: 'QuestionId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allQuestions = new Promise((resolve, reject) => {
              Question.find({id}, projections,(err, Questions) => {
                  err ? reject(err) : resolve(Questions)
              })
          })
          return allQuestions
        }
      },
      Answer: {
        type: new GraphQLList(Answer),
        args: {
          id: {
            name: 'AnswerId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {id}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allAnswers = new Promise((resolve, reject) => {
              Answer.find({id}, projections,(err, Answers) => {
                  err ? reject(err) : resolve(Answers)
              })
          })
          return allAnswers
        }
      }
    }
  })
});

export default schema;
