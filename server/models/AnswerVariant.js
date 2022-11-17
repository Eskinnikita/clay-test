const { Schema, model, default: mongoose } = require("mongoose")

const AnswerVariant = new Schema({
  answer: {type: String, require: true},
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
});

module.exports = model("AnswerVariant", AnswerVariant);

