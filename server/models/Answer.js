const { Schema, model, default: mongoose } = require("mongoose");

const Answer = new Schema(
  {
    question_id: { type: mongoose.ObjectId, ref: "Question", required: true },
    sessionId: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Answer", Answer);
