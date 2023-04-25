const { handleInsertErrors, handleUpdateErrors } = require("../errors/databaseQueries.error.handler");
let { Product } = require("../models");

exports.findOrderProductData = async (productId) => await Product.findOne({ _id: productId })
    .select("title price isAvailable");

exports.findOne = async (slug) => await Product.findOne({ slug }).populate("category");

exports.findAll = async (query = {}, limit, skip) => await Product.find(query)
    .skip(skip)
    .limit(limit)
    .populate("category");


exports.create = async ({ 
    title, categoryId, price, image, description, slug, isAvailable 
}) => {
    try {
        let newProduct = new Product()
        newProduct.title = title;
        newProduct.category = categoryId;
        newProduct.price = price;
        newProduct.image = image;
        newProduct.slug = slug;
        newProduct.description = description;
        newProduct.isAvailable = isAvailable
        return await newProduct.save();
    } catch (error) {
        return handleInsertErrors(error)
    }
}

exports.update = async (query, newData) => {
    let updateProductResult = await Product.updateOne(query, newData)
    return updateProductResult.modifiedCount == 1 ? true : handleUpdateErrors(updateProductResult)
}

exports.findProductImage = async (slug, fields) => await Product
    .findOne({ slug })
    .select("image")

exports.count = async () => await Product.count();