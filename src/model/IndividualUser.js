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
  comparisonResults: [{ number: Number, comparison: String }],
  discriminantResults: [{ number: Number, discriminant: Number }],
});

const individualuser = mongoose.model(
  "individual",
  IndividualSchema,
  "Individual"
);
module.exports = individualuser;
