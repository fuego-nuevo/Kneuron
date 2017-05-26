const util = require('util');
const redis = require('../config/redis');

redis.monitor((err, monitor) => {
  monitor.on('monitor', (time, args) => {
    console.log(`${time}: ${util.inspect(args)}`);
  });
});

module.exports = redis;
