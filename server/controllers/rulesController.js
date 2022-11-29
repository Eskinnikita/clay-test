const RuleSimple = require("../models/RuleSimple");
const RuleComplex = require("../models/RuleComplex");
const { validationResult } = require("express-validator");

require("dotenv").config();

class rulesController {
  async addRuleSimple(req, res) {
    try {
      const ruleSimple = new RuleSimple(req.body);
      const newRuleSimple = await ruleSimple.save();
      return res.json({
        message: "Простое правило успешно добавлен",
        newRuleSimple,
      });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new rulesController();
