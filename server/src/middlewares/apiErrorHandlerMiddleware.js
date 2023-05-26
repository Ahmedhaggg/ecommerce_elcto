let messages = require("../errors/messages.error");
let errorsTypes = require("../errors/errors.types");

const defaultError = {
    success: false,
    message: messages.internalServerError,
    error: errorsTypes.INTERNAL_SERVER_ERROR
}

module.exports = (err, req, res, next) => {
    console.log(err)

    // to check is error from my custome handling exception or internal server Error
    let errorFormat = err.success == false ? err : defaultError;
    
    res.status(err.statusCode || 500).json({
        ...errorFormat
    })
}