const BaseError = require("./base.error");
const errorsTypes = require("./errors.types");
const HttpStatusCode = require("./httpStatusCode");

class BadRequestError extends BaseError {
    constructor(message){
        super(
            errorsTypes.BAD_REQUEST, 
            HttpStatusCode.BAD_REQUEST, 
            message
        )
    }
}

module.exports = BadRequestError;