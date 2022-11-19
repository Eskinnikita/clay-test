const Question = require("../models/Question");
const Answer = require("../models/Answer");
const AnswerVariant = require("../models/AnswerVariant");
const AnswerType = require("../models/AnswerType");
const ClayParameter = require("../models/ClayParameter");
const { validationResult } = require("express-validator");
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
      const newQuestion = await question.save();
      return res.json({ message: "Вопрос успешно добавлен", newQuestion });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async getQuestionById(req, res) {
    try {
      const questionId = req.params.id;
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
      return res.json(question);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: e.message });
    }
  }

  async restoreQuestions(req, res) {
    try {
      const sessionId = req.params.id;
      const lastAnswer = await Answer.findOne({ sessionId }).sort({
        _id: -1,
      });

      const lastQuestion = await Question.aggregate([
        {
          $match: {
            _id: ObjectId(lastAnswer.question_id),
          },
        },
        {
          $lookup: {
            from: "answervariants",
            localField: "_id",
            foreignField: "question_id",
            pipeline: [
              {
                $match: {
                  answer: lastAnswer.answer,
                },
              },
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
      let nextQuestionId = lastQuestion[0].answers[0].rule[0].next_question_id;
      if (lastQuestion[0].type === "freeText") {
        lastQuestion[0].answers[0] = await AnswerVariant.aggregate([
          {
            $match: {
              question_id: ObjectId(lastQuestion[0]._id),
            },
          },
          {
            $lookup: {
              from: "answerrules",
              localField: "_id",
              foreignField: "answer_variant_id",
              as: "rule",
            },
          },
        ]);
        nextQuestionId = lastQuestion[0].answers[0][0].rule[0].next_question_id;
      }
      let nextQuestion = null;
      if (nextQuestionId !== null) {
        nextQuestion = await Question.aggregate([
          {
            $match: {
              _id: ObjectId(nextQuestionId),
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
      }
      res.json(nextQuestion);
      // const answers = await Answer.deleteMany({ _id: sessionId });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: e.message });
    }
  }

  async resetAnswers(req, res) {
    try {
      const sessionId = req.params.id;
      await Answer.deleteMany({ sessionId });
      res.json({ message: "Все ответы успешно удалены" });
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async checkSessionAnswers(req, res) {
    try {
      const sessionId = req.params.id;
      const sessionAnswers = await Answer.find({ sessionId });
      const hasAnswers = !!sessionAnswers.length;
      return res.json({hasAnswers});
    } catch (e) {
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new answerTypesController();
