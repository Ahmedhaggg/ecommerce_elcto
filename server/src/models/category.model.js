let { Schema, model, Types } = require("mongoose")

let categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    numberOfProducts: {
        type: Number,
        default: 0
    }
})

const Category = model("Category", categorySchema);

module.exports = Category;