const Router = require("express");
const router = new Router();
const controller = require("../controllers/clayParametersController");
const validateRequest = require("../middlewares/validateRequest");
const clayParametersValidator = require("../validators/clayParametersValidator");

router.post(
  "/add",
  clayParametersValidator,
  validateRequest,
  controller.addClayParameter
);

module.exports = router;
