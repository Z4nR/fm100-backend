const Article = require("../model/ArticleData");

module.exports = {
  newArticle: async (req, res, next) => {
    const newArticle = new Article(req.body);
    const article = await newArticle.save();
    res.status(201).json(article);
  },

  getAllArticle: async (req, res, next) => {
    const article = await Article.find();
    res.status(200).json(article);
  },
};
