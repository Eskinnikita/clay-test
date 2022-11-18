const { Schema, model, default: mongoose } = require("mongoose");

const AnswerRule = new Schema({
  question_id: { type: mongoose.ObjectId, ref: "Question", required: true },
  answer_variant_id: {
    type: mongoose.ObjectId,
    ref: "AnswerVariant",
    required: true,
  },
  next_question_id: {
    type: mongoose.ObjectId,
    ref: "Question",
  },
});

module.exports = model("AnswerRule", AnswerRule);
