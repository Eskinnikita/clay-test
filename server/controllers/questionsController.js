const Question = require("../models/Question");
const AnswerType = require("../models/AnswerType");
const ClayParameter = require("../models/ClayParameter");
const { validationResult } = require("express-validator");
const AnswerVariant = require("../models/AnswerVariant");
var ObjectId = require("mongodb").ObjectID;

require("dotenv").config();

class answerTypesController {
  async addQuestion(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { title, isAttribute, type, parameter } = req.body;
      const questionType = await AnswerType.findOne({ type });
      const questionParameter = await ClayParameter.findOne({ parameter });
      const question = new Question({
        title,
        isAttribute,
        parameter: questionParameter.parameter,
        type: questionType.type,
      });
      console.log(question);
      const newQuestion = await question.save();
      return res.json({ message: "Вопрос успешно добавлен", newQuestion });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async getQuestionById(req, res) {
    try {
      const questionId = req.params.id;
      console.log(questionId);
      const question = await Question.aggregate([
        {
          $match: {
            _id: ObjectId(questionId),
          },
        },
        {
          $lookup: {
            from: "answervariants",
            localField: "_id",
            foreignField: "question_id",
            pipeline: [
              {
                $lookup: {
                  from: "answerrules",
                  localField: "_id",
                  foreignField: "answer_variant_id",
                  as: "rule",
                },
              },
            ],
            as: "answers",
          },
        },
      ]);
      // question.answers = await AnswerVariant.find({
      //   question_id: question._id,
      // });
      console.log(question);
      return res.json(question);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: e.message });
    }
  }
}

module.exports = new answerTypesController();
