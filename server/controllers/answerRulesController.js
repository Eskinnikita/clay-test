const AnswerRule = require("../models/AnswerRule");
const { validationResult } = require("express-validator");

require("dotenv").config();

class answerRulesController {
  async addAnswerRule(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { question_id, answer_variant_id, next_question_id } = req.body;
      const answerRule = new AnswerRule({
        question_id,
        answer_variant_id,
        next_question_id,
      });
      const newAnswerRule = await answerRule.save();
      return res.json({ message: "Правило успешно добавлен", newAnswerRule });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new answerRulesController();
