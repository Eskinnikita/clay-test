const Router = require("express");
const router = new Router();
const controller = require("../controllers/rulesController");

router.post("/simple/add", controller.addRuleSimple);

module.exports = router;
