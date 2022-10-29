const Client = require("../model/ClientUser");
const Room = require("../model/TestRoom");

module.exports = {
  newClient: async (req, res, next) => {
    const { groupId } = req.params;

    const newClient = new Client(req.body);
    const group = await Room.findById(groupId);

    await newClient.save();
    group.clients.push(newClient);

    await group.save();
    res.status(201).json(newClient);
  },

  getAllClients: async (req, res, next) => {
    const { groupId } = req.params;
    const group = await Room.findById(groupId).populate("clients");
    res.status(200).json(group.clients);
  },

  deleteAllClient: async () => {
    await Client.deleteMany({});
  },
};
