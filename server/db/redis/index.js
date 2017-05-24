const Redis = require('ioredis');
const util = require('util');

const redis = new Redis();

redis.monitor((err, monitor) => {
  monitor.on('monitor', (time, args) => {
    console.log(`${time}: ${util.inspect(args)}`);
  });
});

module.exports = redis;
