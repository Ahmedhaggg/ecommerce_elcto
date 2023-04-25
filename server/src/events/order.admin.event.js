const { redisClient } = require("../config/redis");
const cacheService = require("../utils/cache")
const { PENDING_ORDERS_COUNT_KEY, ORDERS_COUNT, NEW_ORDER_CHANNEL_KEY, UPDATE_ORDER_CHANNEL_KEY } = require("../config/caching.keys")
const EventEmitter = require('events');
const newOrderEmitter = new EventEmitter();

newOrderEmitter.on(NEW_ORDER_CHANNEL_KEY, (newOrder) => {
    Promise.all([
        cacheService.increment(PENDING_ORDERS_COUNT_KEY),
        redisClient.publish(NEW_ORDER_CHANNEL_KEY, JSON.stringify({ newOrder, pendingOrdersCount }))
    ]).catch(() => {})
});

newOrderEmitter.on(UPDATE_ORDER_CHANNEL_KEY, ({ oldStatus, newStatus, orderId, adminId }) => {
    Promise.all([
        cacheService.decrement(`${oldStatus}${ORDERS_COUNT}`),
        cacheService.increment(`${newStatus}${ORDERS_COUNT}`),
        redisClient.publish(UPDATE_ORDER_CHANNEL_KEY, { newStatus, orderId, adminId })
    ]).catch(() => {})
});

module.exports = newOrderEmitter;