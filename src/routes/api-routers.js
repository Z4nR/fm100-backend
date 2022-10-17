const router = require("express-promise-router")();
const IndividualController = require("../controllers/IndividualController");
const { validateIndividualBody, schema } = require("../helpers/route-helper");

//Individual User
router
  .route("/new-user")
  .post(
    validateIndividualBody(schema.individualSchema),
    IndividualController.newIndiUser
  );
router.route("/user-data/:userId").get(IndividualController.getIndiUser);

module.exports = router;
