const BaseError = require("./base.error");
const errorsMessages = require("./messages.error");
const errorsTypes = require("./errors.types");
const HttpStatusCode = require("./httpStatusCode");

class InternalServerError extends BaseError {
    constructor(){
        super(
            errorsTypes.INTERNAL_SERVER_ERROR, 
            HttpStatusCode.INTERNAL_SERVER_ERROR, 
            errorsMessages.internalServerError
        )
    }
}

module.exports = InternalServerError;