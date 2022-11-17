const { body } = require("express-validator");

const answerTypesValidator = [
  body("title").notEmpty().withMessage("Поле не может быть пустым"),
  body("isAttribute").notEmpty().withMessage("Поле не может быть пустым"),
];

module.exports = answerTypesValidator;
