import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
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
    SchoolId: {
      type: (GraphQLInt),
      description: 'The id of the School.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the School.',
    }
  })
});

//Teachers
var Teacher = new GraphQLObjectType({
  name: 'Teacher',
  description: 'Teacher',
  fields: () => ({
    TeacherId: {
      type: (GraphQLInt),
      description: 'The id of the Teacher.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Teacher.',
    }
  })
});

//Students
var Student = new GraphQLObjectType({
  name: 'Student',
  description: 'Student',
  fields: () => ({
    StudentId: {
      type: (GraphQLInt),
      description: 'The id of the Student.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Student.',
    }
  })
});

//Classes Might need to change klass to Class with C being capitalized
//might need to capitalize rest of GQL object types too
var Class = new GraphQLObjectType({
  name: 'Class',
  description: 'Class',
  fields: () => ({
    ClassId: {
      type: (GraphQLInt),
      description: 'The id of the Class.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Class.',
    }
  })
});

//Topics
var Topic = new GraphQLObjectType({
  name: 'Topic',
  description: 'Topic',
  fields: () => ({
    TopicId: {
      type: (GraphQLInt),
      description: 'The id of the Topic.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Topic.',
    }
  })
});

//Lectures
var Lecture = new GraphQLObjectType({
  name: 'Lecture',
  description: 'Lecture',
  fields: () => ({
    LectureId: {
      type: (GraphQLInt),
      description: 'The id of the Lecture.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Lecture.',
    }
  })
});

//Quizzes
var Quiz = new GraphQLObjectType({
  name: 'Quiz',
  description: 'Quiz',
  fields: () => ({
    QuizId: {
      type: (GraphQLInt),
      description: 'The id of the Quiz.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Quiz.',
    }
  })
});


//Questions
var Question = new GraphQLObjectType({
  name: 'Question',
  description: 'Question',
  fields: () => ({
    QuestionId: {
      type: (GraphQLInt),
      description: 'The id of the Question.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Question.',
    }
  })
});

//Answers
var Answer = new GraphQLObjectType({
  name: 'Answer',
  description: 'Answer',
  fields: () => ({
    AnswerId: {
      type: (GraphQLInt),
      description: 'The id of the Answer.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the Answer.',
    }
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
          itemId: {
            name: 'SchoolId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allSchools = new Promise((resolve, reject) => {
              School.find({itemId}, projections,(err, Schools) => {
                  err ? reject(err) : resolve(Schools)
              })
          })
          return allSchools
        }
      },
      Teacher: {
        type: new GraphQLList(Teacher),
        args: {
          itemId: {
            name: 'SchoolId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allTeachers = new Promise((resolve, reject) => {
              Teacher.find({itemId}, projections,(err, Teachers) => {
                  err ? reject(err) : resolve(Teachers)
              })
          })
          return allTeachers
        }
      },
      Student: {
        type: new GraphQLList(Student),
        args: {
          itemId: {
            name: 'StudentId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allStudents = new Promise((resolve, reject) => {
              Student.find({itemId}, projections,(err, Students) => {
                  err ? reject(err) : resolve(Students)
              })
          })
          return allStudents
        }
      },
      Class: {
        type: new GraphQLList(Class),
        args: {
          itemId: {
            name: 'ClassId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allClasses = new Promise((resolve, reject) => {
              Class.find({itemId}, projections,(err, Classes) => {
                  err ? reject(err) : resolve(Classes)
              })
          })
          return allClasses
        }
      },
      Lecture: {
        type: new GraphQLList(Lecture),
        args: {
          itemId: {
            name: 'LectureId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allLectures = new Promise((resolve, reject) => {
              Lecture.find({itemId}, projections,(err, Lectures) => {
                  err ? reject(err) : resolve(Lectures)
              })
          })
          return allLectures
        }
      },
      Topic: {
        type: new GraphQLList(Topic),
        args: {
          itemId: {
            name: 'TopicId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allTopics = new Promise((resolve, reject) => {
              Topic.find({itemId}, projections,(err, Topics) => {
                  err ? reject(err) : resolve(Topics)
              })
          })
          return allTopics
        }
      },
      Quiz: {
        type: new GraphQLList(Quiz),
        args: {
          itemId: {
            name: 'QuizId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allQuizzes = new Promise((resolve, reject) => {
              Quiz.find({itemId}, projections,(err, Quizzes) => {
                  err ? reject(err) : resolve(Quizzes)
              })
          })
          return allQuizzes
        }
      },
      Question: {
        type: new GraphQLList(Question),
        args: {
          itemId: {
            name: 'QuestionId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allQuestions = new Promise((resolve, reject) => {
              Question.find({itemId}, projections,(err, Questions) => {
                  err ? reject(err) : resolve(Questions)
              })
          })
          return allQuestions
        }
      },
      Answer: {
        type: new GraphQLList(Answer),
        args: {
          itemId: {
            name: 'AnswerId',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, {itemId}, source, fieldASTs) => {
          var projections = getProjection(fieldASTs);
          var allAnswers = new Promise((resolve, reject) => {
              Answer.find({itemId}, projections,(err, Answers) => {
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
