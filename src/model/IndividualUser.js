const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComparisonSchema = new Schema({
  num: Number,
  comparison: Boolean,
});

const DiscriminantSchema = new Schema({
  num: Number,
  discriminant: Number,
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
  comparisonResults: [{ num: Number, comparison: Boolean }],
  discriminantResults: [{ num: Number, discriminant: Number }],
});

const individualuser = mongoose.model(
  "individual",
  IndividualSchema,
  "Individual"
);
module.exports = individualuser;
