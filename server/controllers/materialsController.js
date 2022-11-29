const Material = require("../models/Material");
const { validationResult } = require("express-validator");

require("dotenv").config();

class materialsController {
  async addMaterial(req, res) {
    try {
      const material = new Material(req.body);
      const newMaterial = await material.save();
      return res.json({
        message: "Материал успешно добавлен",
        newMaterial,
      });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new materialsController();
