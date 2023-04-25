let router = require("express").Router();
let authController = require("../controllers/auth.controller")
let authValidation = require("../validation/auth.validation")
const checkValidationError = require("../middlewares/checkValidationError");

router.post("/register",
    authValidation.validate("register"),
    checkValidationError,
    authController.register
);

router.post("/login",
    authValidation.validate("login"),
    checkValidationError,
    authController.login
);

module.exports = router;