const ClayParameter = require("../models/ClayParameter");
const { validationResult } = require("express-validator");

require("dotenv").config();

class clayParametersController {
  async addClayParameter(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { parameter } = req.body;
      const clayParameter = new ClayParameter({ parameter });
      const newClayParameter = await clayParameter.save();
      return res.json({
        message: "Параметр успешно добавлен",
        newClayParameter,
      });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new clayParametersController();
