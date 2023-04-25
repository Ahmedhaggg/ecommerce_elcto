let orderRepository = require("../repositories/order.repository");
let productRepository = require("../repositories/product.repository");
let expressAsyncHandler = require("express-async-handler");
const HttpStatusCode = require("../errors/httpStatusCode");
const { ORDER_PENDING } = require("../config/constants");
const NotFoundError = require("../errors/notfound.error");
const BadRequestError = require("../errors/badRequest.error");
let orderCalculater = require("../utils/orderCalculater");
let paymentService = require("../utils/payment");
let notificationEmmiter = require("../events/notification.event") 
// let newOrderEmitter = require("../events/order.admin.event") 
const { redisSubscriber, redisClient } = require("../config/redis");
const { NEW_ORDER_CHANNEL_KEY, UPDATE_ORDER_CHANNEL_KEY } = require("../config/caching.keys");

exports.index = expressAsyncHandler(
    async (req, res, next) => {
        if (req.user) {
            let orders = await orderRepository.findUserOrders(req.user.userId);
            return res.status(HttpStatusCode.OK).json({
                success: true,
                orders
            })
        }

        let { 
            userId = null,
            status = ORDER_PENDING,
            page = 1
        } = req.query;
        
        let formatedQuery = { status };

        if (userId) formatedQuery = { user: userId };
        
        let orders = await orderRepository.findAll(
            formatedQuery, 
            status === ORDER_PENDING ? null : 10,
            status == ORDER_PENDING ? null :( page - 1 ) * 10
        );

        res.status(HttpStatusCode.OK).json({
            success: true,
            orders
        });
    }
)

exports.show = expressAsyncHandler(
    async (req, res, next) => {
        let  { id }  = req.params;
        let order = await orderRepository.findOne(id, true)
        
        if (!order)
            throw new NotFoundError()

        res.status(HttpStatusCode.OK).json({
            success: true,
            order
        });
    }
)

exports.store = expressAsyncHandler(
    async (req, res, next) => {
        const { userId } = req.user;
        const { products, location, paymentToken } = req.body;
        
        let productsData = await Promise.all(products.map(async product => {
            let orderProductData = await productRepository.findOrderProductData(product.id)
            if (!orderProductData || !orderProductData.isAvailable)
                throw new BadRequestError({ message: "this product is not avaiable", productId: product.id })
            return {
                product: product.id,
                quantity: product.quantity,
                price: orderProductData.price
            };
        }))

        let orderAmount = orderCalculater.calculateOrderAmount(productsData);

        
        let checkout = await paymentService.pay({
            amount: orderCalculater.amountWithCents(orderAmount),
            source: paymentToken,
            currency: "usd",
        });

        if (!checkout.success)
            throw new BadRequestError(checkout.error)

        let newOrder = await orderRepository.create({
            products: productsData,
            userId,
            location,
            amount: orderAmount,
            paymentId: Date.now()
        });

        res.status(HttpStatusCode.OK).json({ success: true, newOrder });

        redisClient.publish(NEW_ORDER_CHANNEL_KEY, JSON.stringify(newOrder))
    }
)
exports.updateStatus = expressAsyncHandler(
    async (req, res, next) => {
        let orderId = req.params.id;
        let { status } = req.body;

        let order = await orderRepository.findMainOrderInfo(orderId);

        if (!order)
            throw new NotFoundError();

        await orderRepository.updateOrderStatus(orderId, status);

        res.status(HttpStatusCode.OK).json({
            success: true
        });
        
        notificationEmmiter.emit("update_order",  { orderId, status, userId: order.user.toString() });
    }
)

exports.subscribe = expressAsyncHandler(
    async (req, res, next) => {
        const headers = {
            'Content-Type': 'text/event-stream',
            'Access-Control-Allow-Origin': '*',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };
    
        res.writeHead(HttpStatusCode.OK, headers);
        
        await redisSubscriber.subscribe(NEW_ORDER_CHANNEL_KEY, (message) => {
            res.write(`data: ${message}\n\n`);
        }); 
        
        res.on('close', () => {
            console.log("connectionIsClosed")
            redisClient.unsubscribe(NEW_ORDER_CHANNEL_KEY);
            res.end();
        });
    }
)
exports.count = expressAsyncHandler(
    async (req, res, next) => {
        let { status } = req.query;

        let count = await redisClient.get(`dashboard_statistics:${status}OrdersCount`);

        if (!count) {
            count = await orderRepository.count(status);
            redisClient.set(`dashboard_statistics:${status}OrdersCount`, count, { EX: 60 * 30 })
        }
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            count
        })
    }
)