const Article = require("../model/ArticleData");

module.exports = {
  getAllArticle: async (req, res, next) => {
    const article = await Article.find();
    res.status(200).json(article);
  },
};
