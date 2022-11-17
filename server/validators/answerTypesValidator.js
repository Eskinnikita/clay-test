const { body } = require("express-validator");

const answerTypesValidator = [
  body("type").notEmpty().withMessage("Поле не может быть пустым"),
];

module.exports = answerTypesValidator;
