let { createClient } = require("redis");
const { REDIS_HOST, REDIS_PORT, IS_REDIS_SOCKET_CONNECTION, REDIS_PASSWORD } = require(".");
let options = IS_REDIS_SOCKET_CONNECTION ? {
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
} : { 
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
}

let redisClient = createClient(options);
let redisSubscriber  = createClient(options);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on("connect", () => console.log("redis connection successfully"));

redisSubscriber.on('error', (err) => console.log('Redis subscriber Error', err));
redisSubscriber.on("connect", () => console.log("redis subscriber connection successfully"));
(async () => {
    await redisClient.connect();
    await redisSubscriber.connect();
})()
module.exports = { redisClient, redisSubscriber };