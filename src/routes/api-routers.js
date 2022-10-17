const router = require("express-promise-router")();
const IndividualController = require("../controllers/IndividualController");
const { validateIndividualBody, schema } = require("../helpers/route-helper");

//Individual User
router
  .route("/new-user")
  .post(
    validateIndividualBody(schema.individualSchema),
    IndividualController.newUser
  );
router.route("/user-data/:userId").get(IndividualController.getUser);

module.exports = router;
