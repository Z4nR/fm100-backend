const { generateRandomCharacters } = require("../helpers/route-helper");
const Room = require("../model/TestRoom");

module.exports = {
  newRoom: async (req, res, next) => {
    const codeGenerator = generateRandomCharacters(7);
    const data = { ...req.body, code: codeGenerator };
    const newRoom = new Room(data);
    const room = await newRoom.save();
    res.status(201).json(room);
  },

  getAllRoom: async (req, res, next) => {
    const room = await Room.find();
    res.status(200).json(room);
  },

  getRoom: async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Room.findById(groupId);
    res.status(200).json(group);
  },

  getVerifyRoom: async (req, res, next) => {
    const { codeVerify } = req.params;
    const room = await Room.find({
      $or: [
        {
          code: {
            _id: "01",
            key: codeVerify,
          },
        },
        {
          code: {
            _id: "11",
            key: codeVerify,
          },
        },
      ],
    });
    res.status(201).json(...room);
  },

  deleteAllRoom: async () => {
    await Room.deleteMany({});
  },
};
