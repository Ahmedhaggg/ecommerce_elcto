let { validationResult } = require("express-validator");
let APIError = require("../errors/api.error");
let errorsTypes = require("../errors/errors.types");
let httpStatusCode = require("../errors/httpStatusCode");
let expressAsyncHandler = require("express-async-handler");

let checkValidationError =  expressAsyncHandler(
    async (req, res, next) => {
        console.log(req.body)
        let validationResultArray = validationResult(req).array();
        if (validationResultArray.length === 0)
            return next();

        throw new APIError(errorsTypes.VALIDATION_ERROR, httpStatusCode.BAD_REQUEST, validationResultArray)
       
    }
)

module.exports = checkValidationError;