const BaseError = require("./base.error");
const errorsTypes = require("./errors.types");
const HttpStatusCode = require("./httpStatusCode");

class UnProcessableError extends BaseError {
    constructor(message){
        super(
            errorsTypes.VALIDATION_ERROR, 
            HttpStatusCode.UNPROCESSABLE, 
            message
        )
    }
}

module.exports = UnProcessableError;