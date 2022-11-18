const Router = require("express");
const router = new Router();
const controller = require("../controllers/answerVariantsController");
const validateRequest = require("../middlewares/validateRequest");
const answerVariantsValidator = require("../validators/answerVariantsValidator");

router.post(
  "/add",
  answerVariantsValidator,
  validateRequest,
  controller.addAnswerVariant
);

module.exports = router;
