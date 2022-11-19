const Router = require("express");
const router = new Router();
const validateRequest = require("../middlewares/validateRequest");
const questionsValidator = require("../validators/questionsValidator");
const controller = require("../controllers/questionsController");

router.post(
  "/add",
  questionsValidator,
  validateRequest,
  controller.addQuestion
);

router.get("/:id", controller.getQuestionById);
router.get("/reset/:id", controller.resetAnswers);
router.get("/check/:id", controller.checkSessionAnswers);

module.exports = router;
