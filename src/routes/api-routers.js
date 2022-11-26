const router = require("express-promise-router")();
const ArticleController = require("../controllers/ArticleController");
const ClientController = require("../controllers/ClientController");
const IndividualController = require("../controllers/IndividualController");
const RoomController = require("../controllers/TestRoomController");
const {
  validateBody,
  validateParam,
  schema,
} = require("../helpers/route-helper");

//Individual User
router
  .route("/new-user")
  .post(validateBody(schema.individualSchema), IndividualController.newUser);
router.route("/all-user").get(IndividualController.getAllUser);
router
  .route("/user-data/:userId")
  .get(
    validateParam(schema.idIndividualSchema, "userId"),
    IndividualController.getUser
  );

//Test Room
router
  .route("/create-room")
  .post(validateBody(schema.roomSchema), RoomController.newRoom);
router.route("/all-room").get(RoomController.getAllRoom);
router
  .route("/room/:groupId")
  .get(validateParam(schema.idGroupSchema, "groupId"), RoomController.getRoom);
router
  .route("/verify-code/:codeVerify")
  .get(
    validateParam(schema.codeSchema, "codeVerify"),
    RoomController.getVerifyRoom
  );
router
  .route("/delete-room/:groupId")
  .delete(
    validateParam(schema.idGroupSchema, "groupId"),
    RoomController.deleteRoom
  );

//Client
router
  .route("/:groupId/client")
  .post(
    [
      validateParam(schema.idGroupSchema, "groupId"),
      validateBody(schema.clientSchema),
    ],
    ClientController.newClient
  );
router
  .route("/:groupId/admin")
  .get(
    validateParam(schema.idGroupSchema, "groupId"),
    ClientController.getAllClients
  );

//Article
router.route("/article/new-article").get(ArticleController.newArticle);
router.route("/article/show-article").get(ArticleController.getAllArticle);

module.exports = router;
