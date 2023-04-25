let router = require("express").Router();
let userController = require("../controllers/user.controller");
let guards = require("../middlewares/guards")

router.get("/",
    guards.apiGuards("admin"),
    userController.index
);

router.get("/count", userController.count);

// router.get("/:id",
//     guards.apiGuards("admin"),
//     userController.show
// );

module.exports = router;