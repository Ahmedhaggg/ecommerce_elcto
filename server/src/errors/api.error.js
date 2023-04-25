const BaseError = require("./base.error");

class APIError extends BaseError {
    constructor(error , httpStatusCode , description){
        super(error , httpStatusCode , description)
    }
}

module.exports = APIError;