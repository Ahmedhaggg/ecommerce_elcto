let notificationRepository = require("../repositories/notification.repository");
let expressAsyncHandler = require("express-async-handler");
const HttpStatusCode = require("../errors/httpStatusCode");
let cacheService = require("../utils/cache");
const { NOTIFICATION_SUBSCRIBTION_KEY } = require("../config/constants");
const { redisSubscriber } = require("../config/redis");

exports.index = expressAsyncHandler(
    async (req, res, next) => {
        let { userId } = req.user;
        let notifications = await notificationRepository.findAllByUserId(userId);

        res.status(HttpStatusCode.OK).json({
            success: true,
            notifications
        });
    }
);

exports.destroy = expressAsyncHandler(
    async (req, res, next) => {
        let { userId } = req.user;
        await notificationRepository.deleteUserNotifications(userId);

        res.status(HttpStatusCode.OK).json({
            success: true,
            message: "all user notifications is deleted"
        });
    }
);

exports.subscribe = expressAsyncHandler(
    async (req, res, next) => {
        let { userId } = req.user;
        console.log("new connection")
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };

        res.writeHead(HttpStatusCode.OK, headers);
        
        await redisSubscriber.subscribe(userId, (message) => {
            console.log("newMessage",userId)
            res.write(`data: ${message}\n\n`);
        }); 
        
        req.on('close', () => {
            console.log("connection closed ... ")
        });
    }
)