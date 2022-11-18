const Router = require("express");
const router = new Router();
const controller = require("../controllers/answersController");
const validateRequest = require("../middlewares/validateRequest");
const answersValidator = require("../validators/answersValidator");

router.post(
  "/add",
  answersValidator,
  validateRequest,
  controller.addNewAnswer
);

module.exports = router;
