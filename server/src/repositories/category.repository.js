const { handleInsertErrors } = require("../errors/databaseQueries.error.handler");
let { Category } = require("../models");

exports.findOne = async (query) => await Category.findOne(query);
    
    

exports.findAll = async (query) => await Category.find(query);
    
exports.create = async ({ title, slug }) => {
    try {
        let newCategory = new Category()
        newCategory.title = title;
        newCategory.slug = slug;
        
        return await newCategory.save();
    } catch (error) {
        console.log(error)
        handleInsertErrors(error)
    }
}

exports.count = async () => await Category.count();