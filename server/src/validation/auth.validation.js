let { check } = require("express-validator");
const messagesError = require("../errors/messages.error");

exports.validate = (action) => {
    switch (action) {
        case "register":
            return [
                check("email").not().isEmpty().withMessage(messagesError.notEmpty)
                    .isEmail().withMessage(messagesError.invalidEmail),
                check("password").not().isEmpty().withMessage(messagesError.notEmpty),
                check("firstName").not().isEmpty().withMessage(messagesError.notEmpty),
                check("lastName").not().isEmpty().withMessage(messagesError.notEmpty)
            ];
        case "login":
            return [
                check("email").not().isEmpty().withMessage(messagesError.notEmpty)
                    .isEmail().withMessage(messagesError.invalidEmail),
                check("password").not().isEmpty().withMessage(messagesError.notEmpty)
            ];
        default:
            throw new Error("something went wrong");
    }
}