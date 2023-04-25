let router = require("express").Router();
let categoryValidation = require("../validation/category.validation")
let categoryController = require("../controllers/category.controller")
let checkValidationErrors = require("../middlewares/checkValidationError");
let guards = require("../middlewares/guards");

router
    .route("/")
        .post(
            guards.apiGuards("admin"),
            categoryValidation.validate("create"),
            checkValidationErrors,
            categoryController.store
        )
        .get(categoryController.index);

router.get("/:slug", categoryController.show);

module.exports = router;