const AnswerVariant = require("../models/AnswerVariant");
const { validationResult } = require("express-validator");

require("dotenv").config();

class answerVariantsController {
  async addAnswerVariant(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { question_id, answer } = req.body;
      const answerVariant = new AnswerVariant({ question_id, answer });
      const newAnswerVariant = await answerVariant.save();
      return res.json({ message: "Вариант ответа успешно добавлен", newAnswerVariant });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new answerVariantsController();
