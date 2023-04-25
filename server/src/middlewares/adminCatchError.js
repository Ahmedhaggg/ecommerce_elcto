exports.catchErrors = (controller) => 
    (req, res, next) => 
    Promise
    .resolve(controller(req, res, next))
    .catch((err) => {
        console.log(err)
        res.redirect("/dashboard/505")
    })