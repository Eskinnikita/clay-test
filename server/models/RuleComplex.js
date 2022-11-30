const { Schema, model, default: mongoose } = require("mongoose");

const RuleComplex = new Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  ifParam: { type: String, required: true },
  ifValue: { type: String, required: true },
  question_id_ex: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  ifParam_ex: { type: String, required: true },
  ifValue_ex: { type: String, required: true },
  thenAttr: { type: String, required: true },
  thenValue: { type: String, required: true },
});

module.exports = model("RuleComplex", RuleComplex);
