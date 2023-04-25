const APIError = require("../errors/api.error");
const errorsMessages = require("../errors/messages.error");
const errorsTypes = require("../errors/errors.types");
const HttpStatusCode = require("../errors/httpStatusCode");
const { getDataFromJwtToken } = require("../utils/jwtToken");
const expressAsyncHandler = require("express-async-handler");

exports.apiGuards = (...roles) => expressAsyncHandler(
    async (req, res, next) => {
        try {
            let token = req.headers['authorization'];
            let tokenData = await getDataFromJwtToken(token);
            if (!roles.includes(tokenData.role))
                throw new Error("no users")
            
            req[tokenData.role] = tokenData;

            next();
        } catch (error) {
            throw new APIError(
                errorsTypes.UNAUTHORIZED, 
                HttpStatusCode.unauthorized, 
                errorsMessages.unauthorized
            )
        }   
    }
)

exports.adminGuard = async (req, res, next) => {
    try {
        if (!req.session.admin || !req.session.admin.isLogin)
            throw new Error()

        next();
    } catch (_) {
        res.redirect("/dashboard/login");
    }   
}