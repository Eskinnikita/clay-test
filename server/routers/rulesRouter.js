const Router = require("express");
const router = new Router();
const controller = require("../controllers/rulesController");

router.post("/simple/add", controller.addRuleSimple);
router.post("/complex/add", controller.addRuleComplex);

module.exports = router;
