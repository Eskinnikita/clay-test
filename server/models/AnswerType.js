const { Schema, model } = require("mongoose");

const AnswerType = new Schema({
  type: { type: String, required: true, unique: true },
});

module.exports = model("AnswerType", AnswerType);
