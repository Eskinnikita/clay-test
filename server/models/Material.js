const { Schema, model, default: mongoose } = require("mongoose");

const Material = new Schema({
  title: { type: String, unique: true },
  imageURL: { type: String },
  curability: { type: String, unique: false },
  hardness: { type: String, unique: false },
  colorVariety: { type: String, unique: false },
  reuse: { type: String, unique: false },
  levelOfDetails: { type: String, unique: false },
  viscousity: { type: String, unique: false },
  type: { type: String, unique: false },
  forChildren: { type: String, unique: false },
  budgetSpending: { type: String, unique: false },
  experienceRequired: { type: String, unique: false },
  sculptingTime: { type: String, unique: false },
});

module.exports = model("Material", Material);
