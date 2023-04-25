let { validationResult } = require("express-validator");
let uploader = require("../middlewares/uploader")
let adminCheckValidationError = async (req, res, next) => {
    try {
        let validationResultArray = validationResult(req).array();
        console.log(validationResultArray)
        if (validationResultArray.length === 0)
            return next();
        
        
        if (req.file) {
            await uploader.delete(req.file.key)
        }
        req.flash("validationErrors", validationResultArray);
        req.flash("lastValues", req.body)

        // let backURL = req.header('Referer').split("http://localhost")[1] || '/';

        res.redirect("back");
    } catch (e) {
        res.redirect("/dashboard/505");
    }
}

module.exports = adminCheckValidationError;