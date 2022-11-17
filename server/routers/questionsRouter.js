const Router = require("express");
const router = new Router();
const validateRequest = require("../middlewares/validateRequest");
const questionsValidator = require("../validators/questionsValidator")
const controller = require("../controllers/questionsController");


router.post(
  "/add",
  questionsValidator,
  validateRequest,
  controller.addQuestion
);

router.get(
  "/:id",
  validateRequest,
  controller.getQuestionById
);

module.exports = router;