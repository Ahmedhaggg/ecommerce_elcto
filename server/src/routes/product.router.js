let router = require("express").Router();
let productValidation = require("../validation/product.validation")
let productController = require("../controllers/product.controller")
let checkValidationErrors = require("../middlewares/checkValidationError");
const uploader = require("../middlewares/uploader");
let guards = require("../middlewares/guards");

router
    .route("/")
        .post(
            guards.apiGuards("admin"),
            uploader.saveInMemory("image"),
            productValidation.validate("create"),
            checkValidationErrors,
            productController.store
        )
        .get(productController.index);


router.get("/count", productController.count);

router
    .route("/:slug")
    .get(productController.show)
    .patch(
        guards.apiGuards("admin"),
        productValidation.validate("update"),
        checkValidationErrors,
        productController.update
    )

router
    .patch("/:slug/image",
        guards.apiGuards("admin"),
        uploader.saveInMemory("newImage"),
        productValidation.validate("updateProductImage"),
        checkValidationErrors,
        productController.updateProductImage
    )

module.exports = router;