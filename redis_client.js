const redis = require("redis");
const client = redis.createClient(); // port 6379

(async () => {
    client.on('connect', () => console.log('Connected to redis'));
    await client.connect()
})();

module.exports = client;