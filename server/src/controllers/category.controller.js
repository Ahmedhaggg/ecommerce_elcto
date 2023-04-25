let categoryRepository = require("../repositories/category.repository");
let productRepository = require("../repositories/product.repository");
let expressAsyncHandler = require("express-async-handler")
let slugify = require("slugify");
const NotFoundError = require("../errors/notfound.error");
const HttpStatusCode = require("../errors/httpStatusCode");

exports.store = expressAsyncHandler(
    async (req, res, next) => {
        let { title } = req.body;
        let slug = slugify(title);
        let newCategory = await categoryRepository.create({ title, slug });
        res.status(HttpStatusCode.OK).json({
            success: true,
            newCategory
        });
    }
)

exports.index = expressAsyncHandler(
    async (req, res, next) => {
        let categories = await categoryRepository.findAll();

        res.status(HttpStatusCode.OK).json({
            success: true,
            categories
        });

    }
)

exports.show = expressAsyncHandler(
    async (req, res, next) => {
        let { slug } = req.params;

        let { productsOffset = 0, productsLimit = 10} = req.query;

        let category = await categoryRepository.findOne({ slug });

        if (!category)
            throw new NotFoundError()

        let products = await productRepository.findAll({ category: category.id }, productsLimit, productsOffset); 
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            category: {
                ...category._doc,
                products
            }
        });
    }
)