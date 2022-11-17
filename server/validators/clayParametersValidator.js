const { body } = require("express-validator");

const clayParametersValidator = [
  body("parameter").notEmpty().withMessage("Поле не может быть пустым"),
];

module.exports = clayParametersValidator;
