const router = require("express-promise-router")();
const ClientController = require("../controllers/ClientController");
const IndividualController = require("../controllers/IndividualController");
const RoomController = require("../controllers/TestRoomController");
const { validateIndividualBody, schema } = require("../helpers/route-helper");

//Individual User
router
  .route("/new-user")
  .post(
    validateIndividualBody(schema.individualSchema),
    IndividualController.newUser
  );
router.route("/all-user").get(IndividualController.getAllUser);
router.route("/user-data/:userId").get(IndividualController.getUser);

//Test Room
router.route("/create-room").post(RoomController.newRoom);
router.route("/all-room").get(RoomController.getAllRoom);
router.route("/room/:groupId").get(RoomController.getRoom);
router.route("/verify-code/:codeVerify").get(RoomController.getVerifyRoom);

//Client
router.route("/:groupId/client").post(ClientController.newClient);
router.route("/:groupId/admin").get(ClientController.getAllClients);

module.exports = router;
