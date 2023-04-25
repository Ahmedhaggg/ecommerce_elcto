const EventEmitter = require('events');
const notificationEmitter = new EventEmitter();
let notificationRepository = require("../repositories/notification.repository");
const { redisClient } = require('../config/redis');

notificationEmitter.on("update_order", async ({ userId, status, orderId }) => {
    try {
        let notificationData = { message: `your order is ${status}`, type: "order", relatedId: orderId };
        
        let userChannel = await redisClient.pubSubChannels(userId)
        
        if (userChannel[0] === userId )
            await redisClient.publish(userId, JSON.stringify({...notificationData, newStatus: status}))
        else 
            await notificationRepository.create({...notificationData, userId });
    } catch (_) {}   
})
 

module.exports = notificationEmitter;