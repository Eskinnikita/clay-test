const { Schema, model, default: mongoose } = require("mongoose");

const RuleSimple = new Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  ifParam: { type: String, required: true },
  ifValue: { type: String, required: true },
  thenAttr: { type: String, required: true },
  thenValue: { type: String, required: true },
});

module.exports = model("RuleSimple", RuleSimple);
