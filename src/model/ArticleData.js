const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: String,
  category: String,
  description: String,
  url: String,
});

const articlewebsite = mongoose.model("article", ArticleSchema, "Article");

module.exports = articlewebsite;
