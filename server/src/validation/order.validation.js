let { check, body } = require("express-validator");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                (req, res, next) => {
                    console.log(req.body)
                    next()
                },
                check("location").not().isEmpty().withMessage("can't be empty"),
                check("paymentToken").not().isEmpty().withMessage("can't be empty"),
                check("products[*]id")
                    .not().isEmpty().withMessage("can't be empty"),
                check("products[*]quantity")
                    .not().isEmpty().withMessage("can't be empty")
                    .isInt()
            ];
        default:
            throw new Error("something went wrong");
    }
}