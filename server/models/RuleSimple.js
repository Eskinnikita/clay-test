const { Schema, model, default: mongoose } = require("mongoose");

const RuleSimple = new Schema();

module.exports = model("RuleSimple", RuleSimple);
