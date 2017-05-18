const Sequelize = require('sequelize');
const db = require('../db/models');

const Teacher = db.Teacher;


var findAuth0User = function(req){
  return Teacher.find({
    where: {auth0_id: req.user.sub}
  })
};

module.exports.findAuth0User = findAuth0User;
