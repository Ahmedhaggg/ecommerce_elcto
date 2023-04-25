let { createClient } = require("redis");
let REDIS_PORT = 6379;
let REDIS_HOST = "redis"
let redisClient = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}`});
let redisSubscriber  = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}`});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on("connect", () => console.log("redis connection successfully"));

redisSubscriber.on('error', (err) => console.log('Redis subscriber Error', err));
redisSubscriber.on("connect", () => console.log("redis subscriber connection successfully"));
(async () => {
    await redisClient.connect();
    await redisSubscriber.connect();
})()
module.exports = { redisClient, redisSubscriber };