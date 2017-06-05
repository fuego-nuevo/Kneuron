const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../db/models');
const hasher = require('./util').hasher;


const fetchAdmin = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.params.email, userType: 2 } });
    const data = await bcrypt.compare(req.params.creds, user.password);
    if (data) {
      res.status(200).send({ user, id_token: hasher(req.params.email) });
    } else {
      res.status(404).send('Credentials incorrect');
    }
  } catch (error) {
    console.log('User Does Not Exist');
    res.status(404).send(error);
  }
};


router.get('/:email/:creds', fetchAdmin);

module.exports = router;
