let router = require("express").Router();
let notificationController = require("../controllers/notification.controller")
let guards = require("../middlewares/guards");

router
    .route("/")
        .get(
            guards.apiGuards("user"),
            notificationController.index
        )
        .delete(
            guards.apiGuards("user"),
            notificationController.destroy
        )

router
    .get("/subscribe", 
        guards.apiGuards("user"),
        notificationController.subscribe
    )

module.exports = router;