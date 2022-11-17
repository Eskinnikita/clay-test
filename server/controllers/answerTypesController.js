const AnswerType = require("../models/AnswerType");
const { validationResult } = require("express-validator");

require("dotenv").config();

class answerTypesController {
  async addAnswerType(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { type } = req.body;
      const answerType = new AnswerType({ type });
      const newAnswerType = await answerType.save();
      return res.json({ message: "Тип успешно добавлен", newAnswerType });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new answerTypesController();
