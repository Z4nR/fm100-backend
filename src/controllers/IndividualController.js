const Individual = require("../model/IndividualUser");

module.exports = {
  newUser: async (req, res, next) => {
    const newUser = new Individual(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  getAllUser: async (req, res, next) => {
    const user = await Individual.find();
    res.status(200).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await Individual.findById(userId);
    res.status(200).json(user);
  },

  deleteAllUser: async () => {
    await Individual.deleteMany({});
  },
};
