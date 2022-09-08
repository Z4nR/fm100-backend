const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResultsSchema = new Schema({
  num: Number,
  value: Boolean,
});

const IndividualSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  testType: String,
  testResults: [ResultsSchema],
});

const individualuser = mongoose.model(
  "individual",
  IndividualSchema,
  "Individual"
);
module.exports = individualuser;
