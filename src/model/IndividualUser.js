const mongoose = require("mongoose");
const { Schema } = mongoose;

const IndividualSchema = new Schema({
  date: String,
  fullName: String,
  age: Number,
  gender: String,
  device: String,
  testType: String,
  totalErrorScore: Number,
  comparisonResults: [{ _id: String, comparison: String }],
  discriminantResults: [{ _id: String, discriminant: Number }],
});

const individualuser = mongoose.model(
  "individual",
  IndividualSchema,
  "Individual"
);

module.exports = individualuser;
