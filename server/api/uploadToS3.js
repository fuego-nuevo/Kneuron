require('dotenv').config();
require('dotenv').load();
const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');


// AWS.config.update(
//   {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     subregion: 'us-east-1',
//   });

// const creds = new AWS.Credentials();
// creds.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// creds.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
//
// AWS.config.credentials = creds;

const s3 = new AWS.S3(({ params: { Bucket: 'kneuron' } }));
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-west-2',
});
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 },
});
router.post('/', upload.single('theseNamesMustMatch'), (req, res) => {
  console.log('we hit the route hor');
  s3.putObject({
    Bucket: 'kneuron',
    Key: `my${req.file.buffer}photo`,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }, (err) => {
    console.log(err);
    if (err) return res.status(400).send(err);
    res.send('File uploaded to S3');
  });
});

module.exports = router;
