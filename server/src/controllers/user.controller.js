let userRepository = require("../repositories/user.repository");
let expressAsyncHandler = require("express-async-handler");
const { redisClient } = require("../config/redis");

exports.index = expressAsyncHandler(
    async (req, res, next) => {
        let { page = 1 } = req.query;
        let users = await userRepository.findAll(null, 10, (page -1 ) * 10);

        res.status(200).json({
            success: true,
            users
        });
    }
)

exports.show = expressAsyncHandler(
    async (req, res, next) => {
        let { userId } = req.params;

        let user = await userService.getUser(userId);

        if (!user)
            return res.status(404).json({
                success: false,
                message: "user is not found"
            });

        res.status(200).json({
            success: true,
            user
        })
    }
)

exports.count = expressAsyncHandler(
    async (req, res, next) => {
        let count = await redisClient.get("dashboard_statistics:usersCount");

        if (!count) {
            count = await userRepository.count();
            redisClient.set("dashboard_statistics:usersCount", count, { EX: 60 * 30})
        }
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            count
        })
    }
)