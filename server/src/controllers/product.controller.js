let productRepository = require("../repositories/product.repository");
let expressAsyncHandler = require("express-async-handler");
let uploader = require("../middlewares/uploader");
const BadRequestError = require("../errors/badRequest.error");
const NotFoundError = require("../errors/notfound.error");
const HttpStatusCode = require("../errors/httpStatusCode");
const slugify = require("slugify");
const { redisClient } = require("../config/redis");
const ProductQueryBuilder = require("../utils/queryBuilder/ProductQueryBuilder");

exports.store = expressAsyncHandler(
    async (req, res, next) => {
        let { title, categoryId, price, description, isAvailable } = req.body;
        let slug = slugify(title);
        let buffer = req.file.buffer;
        let fileName = `${Date.now()}${req.file.originalname}`;

        let newProduct = await productRepository.create({ 
            title, categoryId, image: fileName, price, isAvailable, description, slug
        });

        let saveImage = await uploader.saveFile(buffer, fileName);
        
        if (!saveImage)
            throw new BadRequestError("please can send image again")

        res.status(200).json({
            success: true,
            newProduct
        })
    }
)

exports.index = expressAsyncHandler(
    async (req, res, next) => {
        let { page = 1, categoryId, title } = req.query;

        let newProductFilterQuery = new ProductQueryBuilder();
        newProductFilterQuery.setCateoryId(categoryId);
        newProductFilterQuery.setTitle(title);
        newProductFilterQuery.setOffset(page);

        let query = newProductFilterQuery.build();

        let products = await productRepository.findAll(query.query, query.limit, query.offset);
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            products
        });
    }
)

exports.show = expressAsyncHandler(
    async (req, res, next) => {
        let { slug } = req.params;
        let product = await productRepository.findOne(slug);
        
        if (!product)
            throw new NotFoundError();
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            product
        });
    }
)

exports.update = expressAsyncHandler(
    async (req, res, next) => {
        let { slug } = req.params;
        console.log(slug, req.body)
        let { title, price, description, isAvailable } = req.body;
        let newSlug = slugify(title); 
        await productRepository.update({ slug }, { 
            title, 
            slug: newSlug,
            price,
            description,
            isAvailable 
        });

        res.status(HttpStatusCode.OK).json({ success: true });
    }
)

exports.updateProductImage = expressAsyncHandler(
    async ( req, res, next) => {
        let { slug } = req.params;
        let { originalname, buffer } = req.file;

        let product = await productRepository.findProductImage(slug, ["id", "image"])

        if (!product)
            throw new NotFoundError()
        
        let newImageName = `${Date.now()}${originalname}`;

        let saveNewImage = await uploader.saveFile(buffer, newImageName);
        
        if (!saveNewImage)
            throw new BadRequestError("something went wrong when save the new image")

        await productRepository.update({ slug }, { image: newImageName });

        await uploader.removeFile(product.image)
        
        res.status(HttpStatusCode.OK).json({ success: true });
    }
)


exports.count = expressAsyncHandler(
    async (req, res, next) => {
        let count = await redisClient.get("dashboard_statistics:productsCount");

        if (!count) {
            count = await productRepository.count();
            redisClient.set("dashboard_statistics:productsCount", count, { EX: 60 * 30 })
        }
        
        res.status(HttpStatusCode.OK).json({
            success: true,
            count
        })
    }
)