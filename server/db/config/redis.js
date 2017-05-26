require('dotenv').config();
require('dotenv').load();

const Redis = require('ioredis');

let redis = null;

if (process.env.REDIS) {
  redis = new Redis();
} else {
  redis = new Redis(80);
}

module.exports = redis;
