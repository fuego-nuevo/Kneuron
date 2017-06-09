const router = require('express').Router();
const axios = require('axios');

const app_id = '59193b0b';
const app_key = '625d66480c5897855db7b295808b465b';

router.post('/', (req, res, next) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'app_id': app_id,
      'app_key': app_key,
    },
  };
  axios.post('https://api.kairos.com/enroll', { image: req.body.image, subject_id: req.body.subject_id, gallery_name: req.body.gallery_name }, config)
  .then(({ data }) => {
    res.status(201).send(data);
  });
});

module.exports = router;
