const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResultsSchema = new Schema({
  num: Number,
  value: Boolean,
});

const IndividualSchema = new Schema({
  date: String,
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  device: String,
  testType: String,
  totalErrorScore: Number,
  testResults: [ResultsSchema],
});

const individualuser = mongoose.model(
  "individual",
  IndividualSchema,
  "Individual"
);
module.exports = individualuser;
