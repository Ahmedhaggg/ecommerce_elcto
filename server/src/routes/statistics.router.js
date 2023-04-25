let router = require("express").Router();
let adminStaticsController = require("../controllers/statistics.controller")
let guards = require("../middlewares/guards");

router.get("/",
    guards.apiGuards("admin"),
    adminStaticsController.index
);

module.exports = router;