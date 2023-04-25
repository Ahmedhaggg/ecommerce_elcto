let { Schema, model, Types } = require("mongoose");
const Category = require("./category.model");

let productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

productSchema.pre("save", async function (next) {
    try { await Category.updateOne({ _id: this.category }, { $inc: { numberOfProducts: 1 }})} catch (_) {}
    next();
})

const Product = model("Product", productSchema);

module.exports = Product;