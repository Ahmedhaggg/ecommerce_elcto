const { ORDER_COMPLETED } = require("../config/constants");
const { handleInsertErrors, handleUpdateErrors } = require("../errors/databaseQueries.error.handler");
let { Order } = require("../models");

exports.count = async (status) => await Order.count({ status })
exports.create = async (data) => {
    console.log("this is data")
    try {
        let newOrder = new Order();
        newOrder.paymentId = data.paymentId;
        newOrder.user = data.userId;
        newOrder.products = data.products;
        //  data.products.map(product => ({ product: product._id, price: product.price, quantity: product.quantity }));
        newOrder.amount = data.amount;
        newOrder.location = data.location;
        return await newOrder.save();
    } catch (error) {
        return handleInsertErrors(error);
    }
}
exports.findUserOrders = async (userId) => await Order
    .find({ 
        user: userId, 
        status: { $ne: ORDER_COMPLETED } 
    })
    .select("-products -user")
    .populate("products.product")

exports.findAll = async (query, limit, skip) => await Order
    .find(query)
    .limit(limit)
    .skip(skip)
    .select("-products -user")
    .sort({ createdAt: -1});

exports.findOne = async (orderId, admin = false) => await Order
    .findOne({ _id: orderId })
    .populate({
        path: "products.product",
        select: `title price image slug`
    })
    .populate(admin ? {
        path: "user",
        select: "email firstName lastName"
    } : null);


exports.findMainOrderInfo = async (orderId) => await Order.findById(orderId)
    .select("status user");


exports.updateOrderStatus = async (orderId, status) => {
    let orderUpdate = await Order.updateOne({ _id: orderId }, { status });
    console.log(orderUpdate)
    return orderUpdate.modifiedCount == 1 ? true : handleUpdateErrors(orderUpdate) 
}