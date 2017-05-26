const db = require('../db/models');
const router = require('express').Router();

const postSchool = async (req, res) => {
  try {
    const school = await db.School.findOne({ where: { name: req.body.name.toUpperCase() } });
    if (school) {
      console.log('School already exists');
      res.status(404).send('School already exists');
    } else {
      req.body['name'] = req.body.name;
      const newSchool = await db.School.create(req.body);
      console.log('School created');
      res.status(200).send(newSchool);
    }
  } catch (error) {
    console.log('Error in postSchool');
    res.status(500).send(error);
  }
};

const updateSchool = async (req, res) => {
  try {
    const school = await db.School.findOne({ where: { id: req.params.school_id } });
    if (school) {
      req.body['name'] = req.body.name;
      const updatedSchool = school.update(req.body);
      console.log('School updated');
      res.status(200).send(updatedSchool);
    } else {
      console.log('School not found');
      res.status(404).send('School not found');
    }
  } catch (error) {
    console.log('Error in updateSchool');
    res.status(500).send(error);
  }
};

router.post('/', postSchool);
router.put('/:school_id', updateSchool);

module.exports = router;
