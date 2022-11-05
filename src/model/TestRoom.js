const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestRoomSchema = new Schema({
  date: String,
  roomName: String,
  adminEmail: String,
  maxTES: Number,
  roomInitial: String,
  testType: String,
  device: String,
  code: [{ _id: String, key: String }],
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
  ],
});

const testgroup = mongoose.model("testgroup", TestRoomSchema, "TestGroup");

module.exports = testgroup;
