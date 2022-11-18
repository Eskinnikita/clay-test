const { body } = require("express-validator");

const answerTypesValidator = [
  body("question_id").notEmpty().withMessage("Поле не может быть пустым"),
  body("sessionId").notEmpty().withMessage("Поле не может быть пустым"),
  body("answer").notEmpty().withMessage("Поле не может быть пустым"),
];

module.exports = answerTypesValidator;
