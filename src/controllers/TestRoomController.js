const { generateRandomCharacters } = require("../helpers/route-helper");
const Room = require("../model/TestRoom");

module.exports = {
  newRoom: async (req, res, next) => {
    const codeGenerator = generateRandomCharacters(7);
    const newUser = new Room(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  getAllRoom: async (req, res, next) => {
    const user = await Room.find();
    res.status(200).json(user);
  },

  deleteAllRoom: async () => {
    await Room.deleteMany({});
  },
};