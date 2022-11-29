const Router = require("express");
const router = new Router();
const controller = require("../controllers/materialsController");

router.post("/add", controller.addMaterial);

module.exports = router;
