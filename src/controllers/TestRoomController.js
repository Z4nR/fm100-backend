const { generateRandomCharacters } = require("../helpers/route-helper");
const Room = require("../model/TestRoom");
const mailer = require("nodemailer");

module.exports = {
  newRoom: async (req, res, next) => {
    const codeGenerator = generateRandomCharacters(7);
    const data = { ...req.body, code: codeGenerator };
    const newRoom = new Room(data);
    const room = await newRoom.save();

    const adminCode = data.code[0].key;
    const clientCode = data.code[1].key;

    const smtpTransport = mailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.adminEmail,
      subject: req.body.roomInitial + " Code Verification",
      text: `Admin Code : ${adminCode}, Client Code : ${clientCode}`,
    };
    smtpTransport.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
      }
    });

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
