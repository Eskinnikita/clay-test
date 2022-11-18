const Router = require("express");
const router = new Router();
const controller = require("../controllers/answerRulesController");
const validateRequest = require("../middlewares/validateRequest");
const answerRulesValidator = require("../validators/answerRulesValidator");

router.post(
  "/add",
  answerRulesValidator,
  validateRequest,
  controller.addAnswerRule
);

module.exports = router;
