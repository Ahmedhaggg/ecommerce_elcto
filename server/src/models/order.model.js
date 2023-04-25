let { Schema, model, Types } = require("mongoose");
const { ORDER_PENDING, ORDER_SHIPPED, ORDER_COMPLETED } = require("../config/constants");

let orderSchema = new Schema({
    products: {
        type: [
            {
                _id: false,
                product: {
                    type: Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: false
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: [ORDER_PENDING, ORDER_SHIPPED, ORDER_COMPLETED],
        default: ORDER_PENDING
    },
    location: {
        type: String,
        required: true
    }   
}, { timestamps: true })

const Order = model("Order", orderSchema);

module.exports = Order;  