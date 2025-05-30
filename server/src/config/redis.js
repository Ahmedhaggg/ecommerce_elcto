let { createClient } = require("redis");
const { REDIS_HOST, REDIS_PORT, IS_REDIS_SOCKET_CONNECTION, REDIS_PASSWORD } = require(".");
console.log("is redis connection", IS_REDIS_SOCKET_CONNECTION)
let options =  IS_REDIS_SOCKET_CONNECTION ? { 
    password: REDIS_PASSWORD,
    username: "default",
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
} : {
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
};
console.log(options)
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
