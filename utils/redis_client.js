const redis = require("redis");
// const client = redis.createClient(); // port 6379
const client = redis.createClient({
    url: process.env.REDIS_URL
});

(async () => {
    client.on('connect', () => console.log('Connected to redis'));
    await client.connect()
})();

module.exports = client;