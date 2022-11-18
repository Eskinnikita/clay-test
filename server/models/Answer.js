const { Schema, model } = require("mongoose");

const Answer = new Schema({
  question_id: { type: monoose.ObjectId, ref: "Question", required: true },
  sessionId: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
});

module.exports = model("Answer", Answer);
