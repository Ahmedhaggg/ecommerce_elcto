let productRepository = require("../repositories/product.repository");
let categoryRepository = require("../repositories/category.repository");
let orderRepository = require("../repositories/order.repository");
let userRepository = require("../repositories/user.repository");
let expressAsyncHandler = require("express-async-handler");
const HttpStatusCode = require("../errors/httpStatusCode");
const { ORDER_PENDING, ORDER_SHIPPED, ORDER_COMPLETED } = require("../config/constants");
const { redisClient } = require("../config/redis");

exports.index = expressAsyncHandler(
    async (req, res, next) => {
        let cachedCounts = await redisClient.mGet([
            "dashboard_statistics:categoriesCount",
            "dashboard_statistics:productsCount",
            "dashboard_statistics:pendingOrdersCount",
            "dashboard_statistics:shippedOrdersCount",
            "dashboard_statistics:completedOrdersCount",
            "dashboard_statistics:usersCount"
        ]);
        
        
        if (cachedCounts.every(c => c !== null)) {
            const [categoriesCount, productsCount, pendingOrdersCount, shippedOrdersCount, completedOrdersCount, usersCount] = cachedCounts.map(c => parseInt(c));
            return res.status(HttpStatusCode.OK).json({
                success: true,
                statistics: [
                    { name: "categories", count: categoriesCount },
                    { name: "products", count: productsCount },
                    { name: "pending orders", count: pendingOrdersCount },
                    { name: "shipped orders", count: shippedOrdersCount },
                    { name: "completed orders", count: completedOrdersCount },
                    { name: "users", count: usersCount }
                ]
            });
        }
        const [
            categoriesCount,
            productsCount,
            pendingOrdersCount,
            shippedOrdersCount,
            completedOrdersCount,
            usersCount
        ] = await Promise.all([
            categoryRepository.count(),
            productRepository.count(),
            orderRepository.count(ORDER_PENDING),
            orderRepository.count(ORDER_SHIPPED),
            orderRepository.count(ORDER_COMPLETED),
            userRepository.count()
        ]);
    
        const counts = {
            "dashboard_statistics:categoriesCount": categoriesCount,
            "dashboard_statistics:productsCount": productsCount,
            "dashboard_statistics:pendingOrdersCount": pendingOrdersCount,
            "dashboard_statistics:shippedOrdersCount": shippedOrdersCount,
            "dashboard_statistics:completedOrdersCount": completedOrdersCount,
            "dashboard_statistics:usersCount": usersCount
        };
    
        
        const multi = redisClient.multi();

        for (const [key, value] of Object.entries(counts)) {
            multi.set(key, value);
            multi.expire(key, 60 * 30);
        }

        await multi.exec();

        res.status(200).json({
            success: true,
            statistics: [
                { name: "categories", count: categoriesCount },
                { name: "products", count: productsCount },
                { name: "pending orders", count: pendingOrdersCount },
                { name: "shipped orders", count: shippedOrdersCount },
                { name: "completed orders", count: completedOrdersCount },
                { name: "users", count: usersCount }
            ]
        });
    }      
)
