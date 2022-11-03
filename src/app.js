const {
  getAllClients,
  deleteAllClient,
} = require("./controllers/ClientController");
const {
  deleteAllUser,
  getAllUser,
} = require("./controllers/IndividualController");
const {
  getAllRoom,
  deleteAllRoom,
} = require("./controllers/TestRoomController");

const express = require("express"),
  mongoose = require("mongoose"),
  route = require("./routes/api-routers"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  { Server } = require("socket.io"),
  cron = require("node-cron");

require("dotenv").config();

//Async Await
mongoose.Promise = global.Promise;

//Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(bodyParser.json());

//Router
app.use("/v1", route);

//Catch 404 Error
app.use((req, res, next) => {
  const err = new Error("Not Found, Try Again");
  err.status = 404;
  next(err);
});

//Error Handler Function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message,
    },
  });

  console.log(err);
});

//Connect DB
const mongo = mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongo
  .then(() => {
    console.log("DB is Working well");
  })
  .catch((err) => {
    console.log(err);
  });

//Delete Daily Schedule
const deleteSchedule = cron.schedule(
  "59 59 23 * * *",
  () => {
    if (getAllUser.length || getAllRoom.length || getAllClients.length > 0) {
      deleteAllUser();
      deleteAllRoom();
      deleteAllClient();
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);

deleteSchedule.start();

//Listen port
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Port is good");
  console.log(port);
});

//Web Socket
function onSocketConnect(socket) {
  socket.on("client-join", () => {
    socket.emit("refresh-list");
  });
}

const socket = new Server(server, { cors: { origin: "*" } });
socket.on("connect", onSocketConnect);
