const router = require('express').Router();
const axios = require('axios');
const db = require('../db/models');

const app_id = '59193b0b';
const app_key = '625d66480c5897855db7b295808b465b';

router.post('/', (req, res, next) => {
  console.log('helllooo from camera server boooiiii');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'app_id': app_id,
      'app_key': app_key,
    },
  };
  console.log('this is the gallery_name ', req.body.gallery_name)
  console.log('this is the subject id ', req.body.subject_id)
  axios.post("https://api.kairos.com/verify", { image: req.body.image, subject_id: req.body.subject_id, gallery_name: req.body.gallery_name }, config)
  .then(data => {
    console.log("this is the data from camera api line 10", data.data)
    res.status(201).send(data.data)
  })

})

module.exports = router;