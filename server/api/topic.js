const db = require('../db/models');
const router = require('express').Router();
const redis = require('../db/models');

const postTopic = async (req, res) => {
  try {
    const lecture = await db.Lecture.findOne({ where: { id: req.body.lecture_id } });
    if (lecture) {
      const topic = await db.Topic.findOne({ where: { name: req.body.name }});
      console.log("TOPIC LOOKUP RESULTED IN: ", topic)
      if(topic === null){
        req.body['name'] = req.body.name;
        req.body['lecture_id'] = req.body.lecture_id;
        const topic = await db.Topic.create(req.body);
        console.log('Topic created');
        // redis.set('dbTeacherCheck', false);
        res.status(200).send(topic);
      } else {
        console.log("Topic already exists: ", topic);
        res.status(200).send(topic);
      }
    } else {
      console.log('Lecture not found');
      res.status(404).send('Lecture not found');
    }
  } catch (error) {
    console.log('Error in postTopic');
    res.status(500).send('Error in postTopic');
  }
};

const updateTopic = async (req, res) => {
  try {
    const topic = await db.Topic.findOne({ where: { id: req.params.topic_id } });
    if (topic) {
      req.body['name'] = req.body.name;
      const updatedTopic = await topic.update(req.body);
      console.log('Topic updated');
      redis.set('dbTeacherCheck', false);
      res.status(200).send(updatedTopic);
    } else {
      console.log('Topic not found');
      res.status(404).send('Topic not found');
    }
  } catch (error) {
    console.log('Error in updateTopic');
    res.status(500).send('Error in updateTopic');
  }
};

const deleteTopic = async (req, res) => {
  try {
    console.log(req.params);
    const topic = await db.Topic.findOne({ where: { id: req.params.topic_id } });
    if (topic) {
      console.log("TOPIC IS: ", topic)
      const deletedTopic = await topic.destroy({ force: true });
      console.log('Topic deleted');
      // redis.set('dbTeacherCheck', false);
      res.status(200).send(deletedTopic);
    } else {
      console.log('Topic not found');
      res.status(404).send('Topic not found');
    }
  } catch (error) {
    console.log('Error in deleteTopic');
    res.status(500).send('Error in deleteTopic');
  }
};

router.post('/', postTopic);
router.put('/:topic_id', updateTopic);
router.delete('/:topic_id', deleteTopic);

module.exports = router;
