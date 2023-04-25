const HttpStatusCode = require("../errors/httpStatusCode")
const messagesError = require("../errors/messages.error")

module.exports = (req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: messagesError.notFound
    })
}