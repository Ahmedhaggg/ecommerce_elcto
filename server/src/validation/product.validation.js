let { body } = require("express-validator");
const messagesError = require("../errors/messages.error");

let updateProductValidation = [
    body("title").not().isEmpty().withMessage(messagesError.notEmpty),
    body("price").not().isEmpty().withMessage(messagesError.notEmpty)
        .isInt().withMessage(messagesError.isNumber),
    body("description").not().isEmpty().withMessage(messagesError.notEmpty),
    body("isAvailable").notEmpty().withMessage(messagesError.notEmpty)
]
let productImageValidation = (field) => body(field).custom((value, { req }) => {
    if (!req.file)
        throw new Error("can't add product without upload image")
    return true;
})

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                ...updateProductValidation,
                body("categoryId").not().isEmpty().withMessage(messagesError.notEmpty),
                productImageValidation("image")
            ];
        case "update": 
            return updateProductValidation;
        case "updateProductImage":
            return productImageValidation("newImage");
            
        default:
            throw new Error("something went wrong");
    }
}