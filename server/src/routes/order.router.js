let router = require("express").Router();
let orderController = require("../controllers/order.controller");
let orderValidation = require("../validation/order.validation");
let guards = require("../middlewares/guards")
let checkValidationError = require("../middlewares/checkValidationError");

router
    .route("/")
    .get(
        guards.apiGuards("admin", "user"),
        orderController.index
    )
    .post(
        guards.apiGuards("user"),
        orderValidation.validate("create"),
        checkValidationError,
        orderController.store
    );

router.get("/subscribe", 
    guards.apiGuards("admin"),
    orderController.subscribe
);
router.get("/count", 
    guards.apiGuards("admin"),
    orderController.count
);

router.get("/:id",
    guards.apiGuards("admin", "user"),
    orderController.show
);

router.patch("/:id/status",
    guards.apiGuards("admin"),
    orderController.updateStatus
)

module.exports = router;