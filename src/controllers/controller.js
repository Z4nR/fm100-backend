const Individual = require("../model/IndividualUser");

module.exports = {
  newIndiUser: async (req, res, next) => {
    const newIndiUser = new Individual(req.body);
    const indi = await newIndiUser.save();
    res.status(201).json(indi);
  },
};
