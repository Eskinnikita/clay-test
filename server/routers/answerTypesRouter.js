const Router = require("express");
const router = new Router();
const controller = require("../controllers/answerTypesController");
const validateRequest = require("../middlewares/validateRequest");
const answerTypesValidator = require("../validators/answerTypesValidator");

//User registration
router.post(
  "/add",
  answerTypesValidator,
  validateRequest,
  controller.addAnswerType
);

module.exports = router;
