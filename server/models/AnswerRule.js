const { Schema, model } = require("mongoose");

const AnswerRule = new Schema({
  question_id: { type: monoose.ObjectId, ref: "Question", required: true },
  answer_variant_id: {
    type: monoose.ObjectId,
    ref: "AnswerVariant",
    required: true,
  },
  answer: { type: String, required: true },
});

module.exports = model("AnswerRule", AnswerRule);
