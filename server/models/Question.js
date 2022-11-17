const { Schema, model, default: mongoose } = require("mongoose");

const Question = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, ref: "AnswerType" },
    parameter: { type: String, ref: "ClayParameter" },
    isAttribute: { type: Boolean, required: true },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "AnswerVariant" }],
  }
);


module.exports = model("Question", Question);
