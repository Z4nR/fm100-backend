const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema({
  date: String,
  fullName: String,
  age: Number,
  gender: String,
  device: String,
  testType: String,
  totalErrorScore: Number,
  status: String,
  comparisonResults: [{ number: Number, comparison: String }],
  discriminantResults: [{ number: Number, discriminant: Number }],
});

const clientuser = moongose.model("client", ClientSchema, "Client");

module.exports = clientuser;
