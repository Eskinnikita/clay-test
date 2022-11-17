const { Schema, model } = require("mongoose");

const ClayParameter = new Schema({
  parameter: { type: String, required: true, unique: true },
});

module.exports = model("ClayParameter", ClayParameter);
