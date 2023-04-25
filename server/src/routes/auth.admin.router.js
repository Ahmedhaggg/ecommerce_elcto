let router = require("express").Router();
let adminAuthController = require("../controllers/auth.admin.controller");
let adminAuthValidation = require("../validation/auth.admin.validation");
const checkValidationError = require("../middlewares/checkValidationError");

router.post("/login",
    adminAuthValidation.validate("login"),
    checkValidationError,
    adminAuthController.login
);

router.post("/register",
    adminAuthController.register
);

module.exports = router;