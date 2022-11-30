const Material = require("../models/Material");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const RuleSimple = require("../models/RuleSimple");
const RuleComplex = require("../models/RuleComplex");
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

  async getMaterialBySession(req, res) {
    try {
      const sessionId = req.params.id;
      const predictedMaterial = {};
      const complexRules = await RuleComplex.find();
      const materials = await Material.find();
      const userAnswers = await Answer.aggregate([
        {
          $match: {
            sessionId: sessionId,
          },
        },
        {
          $lookup: {
            from: "rulesimples",
            localField: "question_id",
            foreignField: "question_id",
            as: "rulesSimple",
          },
        },
        {
          $lookup: {
            from: "questions",
            localField: "question_id",
            foreignField: "_id",
            as: "question",
          },
        },
      ]);

      userAnswers.forEach((answer) => {
        let selectedAnswer = null;
        //check type of question
        if (answer.question[0].type !== "freeText") {
          selectedAnswer = answer.rulesSimple.find((rule) => {
            return rule.ifValue === answer.answer;
          });
        } else {
          //if question type is free text compare it's answer's value with every condition
          selectedAnswer = answer.rulesSimple.find((rule) => {
            if (rule.ifValue[0] === ">" || rule.ifValue[0] === "<") {
              //eval to convert string condition to js code (>2000, <5000)
              const conditionResult = eval(`${answer.answer}${rule.ifValue}`);
              return conditionResult;
              //if value is in the range (2000-5000)
            } else if (rule.ifValue.includes("-")) {
              const range = rule.ifValue.split("-");
              return range[0] <= +answer.answer <= range[1];
            }
          });
        }
        //apply key to predicted material object
        if (selectedAnswer !== undefined && selectedAnswer !== null) {
          predictedMaterial[selectedAnswer.thenAttr] = selectedAnswer.thenValue;
        }
      });

      //loop over complex rules
      complexRules.forEach((rule) => {
        //check if every question has it's own answers and exists
        const question = userAnswers.find(
          (answer) => answer.question_id === rule.question_id
        );
        const question_ex = userAnswers.find(
          (answer) => answer.question_id === rule.question_id_ex
        );
        //compare values
        if (
          question !== undefined &&
          question_ex !== undefined &&
          question.answer === rule.ifValue &&
          question_ex.answer === rule.ifValue
        ) {
          predictedMaterial[rule.thenAttr] = rule.thenValue;
        }
      });

      //find the best match in materials
      let bestMatchMaterials = [];
      let counter = 0;
      let maxEntries = 0;
      materials.forEach((material) => {
        for (let key in material) {
          if (predictedMaterial.hasOwnProperty(key)) {
            if (material[key] === predictedMaterial[key]) {
              counter++;
            }
          }
        }
        //if material has equal points put them to array
        if (counter === maxEntries) {
          bestMatchMaterials.push(material);
        }
        //if max entries were updated - clean array and renew max
        if (counter > maxEntries) {
          bestMatchMaterials = [];
          maxEntries = counter;
          bestMatchMaterials.push(material);
        }
        counter = 0;
      });

      return res.json(bestMatchMaterials);
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new materialsController();
