const { body } = require("express-validator");

const questionVariantsValidator = [
  body("answer").notEmpty().withMessage("Поле не может быть пустым"),
];

module.exports = questionVariantsValidator;
