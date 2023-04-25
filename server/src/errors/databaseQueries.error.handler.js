const BadRequestError = require("./badRequest.error");
const InternalServerError = require("./internalServer.error");
const errorsMessages = require("./messages.error");
const NotFoundError = require("./notfound.error");
const UnProcessableError = require("./unprocessable.error");

exports.handleInsertErrors = error => {    
    let errors = [];
    if (error.name === "ValidationError") {
        Object.keys(error.errors).forEach((key) => {
            errors.push({
                param: error.errors[key],
                msg: error.errors[key].kind === "ObjectId" ? errorsMessages.incorrectId : error.errors[key].message
            })
        });
    } 

    if (error.code === 11000) {
        Object.keys(error.keyPattern).forEach(key => {
            errors.push({
                param: key,
                msg: errorsMessages.unique
            })
        });
    }
    
    if (errors.length)
        throw new UnProcessableError(errors)
    else throw new InternalServerError()

};

exports.handleUpdateErrors = updateResult => {
    throw updateResult.matchedCount === 0 ? 
        new NotFoundError() : new BadRequestError(errorsMessages.invalidUpdateData)
}