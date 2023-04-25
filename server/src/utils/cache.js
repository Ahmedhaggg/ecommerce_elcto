let { redisClient } = require("../config/redis")

exports.set = async (key, data, minutesTimeout = null) => {
    try {
        await redisClient.set(key, JSON.stringify(data))
        if (minutesTimeout)
            redisClient.expire(key, minutesTimeout * 60)

        return true;
    } catch(result) {
        console.log(result)
        return false;
    }
}

exports.get = async (key) => await redisClient.get(key);

exports.update = async (key, data) => {
    try {
        await redisClient.set(key, data)
        return true;
    } catch(_) {
        return false;
    }
}

exports.delete = async (key) => {
    try {
        await redisClient.del(key)
        return true;
    } catch(_) {
        return false;
    }
}

exports.saveArray = async (key, array) => await redisClient.lPush(key, array);

exports.getArray = async (key) => await cache.lRange(key);

exports.increment = async (key) => await redisClient.incr(key);
exports.decrement = async (key) => await redisClient.decr(key);