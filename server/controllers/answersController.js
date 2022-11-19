const Answer = require("../models/Answer");
const { validationResult } = require("express-validator");

require("dotenv").config();

class answerController {
  async addNewAnswer(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { question_id, sessionId, answer } = req.body;
      const answerData = new Answer({
        question_id,
        sessionId,
        answer,
      });
      const newAnswer = await answerData.save();
      return res.json({ message: "Ответ успешно добавлен", newAnswer });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера", error: e });
    }
  }
}

module.exports = new answerController();
