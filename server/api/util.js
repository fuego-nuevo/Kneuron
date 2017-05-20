const Sequelize = require('sequelize');
const db = require('../db/models');

const Teacher = db.Teacher;


var findAuth0User = function(req){
  return Teacher.find({
    where: {auth0_id: req.user.sub}
  })
};

const hasher = (message) => {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var b = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"
  return message.replace(/[a-z]/gi, c => b[a.indexOf(c)])
}

module.exports = {
  findAuth0User,
  hasher
}
