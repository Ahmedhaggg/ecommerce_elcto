let { check } = require("express-validator");
const messagesError = require("../errors/messages.error");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("title").not().isEmpty().withMessage(messagesError.notEmpty)
            ];
        default:
            throw new Error("something went wrong");
    }
}