const Individual = require("../model/IndividualUser");

module.exports = {
  newIndiUser: async (req, res, next) => {
    const newIndiUser = new Individual(req.body);
    const indi = await newIndiUser.save();
    res.status(201).json(indi);
  },

  getIndiUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await Individual.findById(userId);
    res.status(200).json(user);
  },
};
